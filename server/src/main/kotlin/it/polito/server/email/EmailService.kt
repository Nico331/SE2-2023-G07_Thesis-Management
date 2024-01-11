package it.polito.server.email

import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.MailException
import org.springframework.stereotype.Service

@Service
class EmailService(@Autowired private val emailSender: JavaMailSender) {

    suspend fun sendSimpleMessage(to: String, subject: String, text: String, from: String) {
        try {
            val message = SimpleMailMessage()
            message.from = from
            message.setTo(to)
            message.subject = subject
            message.text = text
            println("sending e-mail...\n$message")
            emailSender.send(message)
            println("Sent successfully")
        } catch (e: MailException) {
            println("Error sending mail to $to: ${e.message}")
        }
    }
    suspend fun notifyAddedCoSupervisor(proposalTitle: String, to: String){
        try {
            val message = SimpleMailMessage()
            message.from = "no-reply@polito.it"
            message.setTo(to)
            message.subject = "You have been added as a Co-Supervisor"
            message.text = "You have been added as a Co-Supervisor to the proposal: \"$proposalTitle\""
            println("sending e-mail...\n$message")
            emailSender.send(message)
            println("Sent successfully")
        } catch (e: MailException) {
            println("Error sending mail to $to: ${e.message}")
        }
    }
    suspend fun notifyRemovedCoSupervisor(proposalTitle: String, to: String){
        try {
            val message = SimpleMailMessage()
            message.from = "no-reply@polito.it"
            message.setTo(to)
            message.subject = "You have been removed as a Co-Supervisor"
            message.text = "You have been removed as a Co-Supervisor from the proposal: \"$proposalTitle\""
            println("sending e-mail...\n$message")
            emailSender.send(message)
            println("Sent successfully")
        } catch (e: MailException) {
            println("Error sending mail to $to: ${e.message}")
        }
    }
}
