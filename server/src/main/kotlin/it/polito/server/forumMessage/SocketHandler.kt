package it.polito.server.forumMessage

import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.*
import it.polito.server.InvalidInputException
import it.polito.server.forum.ForumUser
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import java.time.Instant
import java.time.LocalDate
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Component
class WebSocketHandler(
    private val messageService: MessageService,
    private val objectMapper: ObjectMapper,
) : TextWebSocketHandler() {

    private var sessions: MutableMap<String, MutableList<WebSocketSession>> = mutableMapOf()
    private var onlineUsers: MutableMap<String, MutableList<ForumUser>> = mutableMapOf()
    private val gson = GsonBuilder()
        .registerTypeAdapter(LocalDate::class.java, JsonDeserializer { json, _, _ ->
            LocalDate.parse(json.asJsonPrimitive.asString)
        })
        .registerTypeAdapter(Instant::class.java, JsonSerializer<Instant> { src, _, _ ->
            JsonPrimitive(src.toString())
        })
        .create()
    override fun afterConnectionEstablished(session: WebSocketSession) {
        println("Entrato in socket")
        val forumId = session.uri.toString().split("=")[1].split("&")[0]

        println(forumId)
        if(sessions[forumId]==null){
            sessions[forumId] = mutableListOf(session)
        }else
            sessions[forumId]!!.add(session)

        val messages = messageService.getLastTenMessages(forumId)
        for (message in messages) {
            val combinedObject = mapOf(
                "type" to "message",
                "message" to message
            )
            session.sendMessage(TextMessage(gson.toJson(combinedObject)))
        }
    }

    override fun afterConnectionClosed(session: WebSocketSession, closeStatus: CloseStatus) {
        println("Conn chiusa")
        val forumId = session.uri.toString().split("=")[1].split("&")[0]
        sessions[forumId]?.remove(session)
        if(sessions[forumId]?.size==0){
            sessions.remove(forumId)
        }
    }

    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        val payload = message.payload
        val forumId = session.uri.toString().split("=")[1].split("&")[0]
        println(payload)
        try {
            val messageDto = objectMapper.readValue(payload, MessageDTO::class.java)

            CoroutineScope(Dispatchers.IO).launch {
                messageService.newMessage(messageDto)
            }
            val combinedObject = mapOf(
                "type" to "newMessage",
                "message" to messageDto
            )
            val messageJson = gson.toJson(combinedObject)
            println("Sessioni: ${sessions[forumId]}")
            sessions[forumId]?.forEach{session->
                session.sendMessage(TextMessage(messageJson))
            }
        } catch (ex: Exception) {
            println(ex)
            try {
                val newMessages = objectMapper.readValue(payload, NewMessagesDTO::class.java)
                val messages = messageService.getMessagesByPage(forumId,newMessages.n)
                for (message in messages) {
                    val combinedObject = mapOf(
                        "type" to "message",
                        "message" to message
                    )
                    session.sendMessage(TextMessage(gson.toJson(combinedObject)))
                }
            } catch (ex: Exception){
                throw InvalidInputException("Websocket internal error")
            }
        }
    }
}

data class NewMessagesDTO (
    val type: String,
    val n: Int
)
