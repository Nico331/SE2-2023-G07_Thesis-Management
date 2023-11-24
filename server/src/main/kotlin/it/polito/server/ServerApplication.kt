package it.polito.server

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class ServerApplication

fun main(args: Array<String>) {
    val context = runApplication<ServerApplication>(*args)
    val foo = 7
}
