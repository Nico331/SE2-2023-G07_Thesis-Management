package it.polito.server.forumMessage

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Component
import org.springframework.stereotype.Controller
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry


//@Controller
//class WebSocketController {
//    @MessageMapping("/ws")
//    @SendTo("/ws")
//    fun handleWebSocketMessage(message: String): String {
//        return message
//    }
//}
//

@Component
@Configuration
@EnableWebSocket
class WebSocketConfig() : WebSocketConfigurer {
    @Autowired
    private lateinit var webSocketHandler: WebSocketHandler
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(webSocketHandler, "/ws", "/socket.io")
//        registry.addHandler(webSocketHandler, "/ws","/index.html")
//            .setAllowedOrigins("*")
//            .withSockJS()
    }
}
