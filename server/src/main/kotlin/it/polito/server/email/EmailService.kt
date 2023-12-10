package it.polito.server.email

import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EmailService(@Autowired private val emailSender: JavaMailSender) {

    fun sendSimpleMessage(to: String, subject: String, text: String, from: String) {
        val message = SimpleMailMessage()
        message.from = from
        message.setTo(to)
        message.subject = subject
        message.text = text
        emailSender.send(message)
    }
}
