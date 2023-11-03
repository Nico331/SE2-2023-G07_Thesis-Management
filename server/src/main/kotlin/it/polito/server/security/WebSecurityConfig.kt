package it.polito.server.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource

@Configuration
@EnableWebSecurity
class WebSecurityConfig {
    //@Autowired
    //private lateinit var jwtAuthConverter: JwtAuthConverter
    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {

        http.authorizeHttpRequests()
            .requestMatchers(HttpMethod.GET,"/API/**").permitAll()
            .requestMatchers(HttpMethod.POST,"/API/**").permitAll()
            .requestMatchers(HttpMethod.PUT,"/API/**").permitAll()
            .requestMatchers(HttpMethod.DELETE,"/API/**").permitAll()
            .requestMatchers(HttpMethod.OPTIONS,"/API/**").permitAll()



        http.csrf().ignoringRequestMatchers("/API/**")
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        return http.build()
    }


    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = mutableListOf("http://localhost:3000/socket.io")
        //configuration.allowedMethods = mutableListOf("GET", "POST")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }


    companion object {
        const val PROFESSOR = "Professor"
        const val STUDENT = "Student"
        const val SECRETARY_CLERK = "SecretaryClerk"
        const val FACULTY_DIRECTOR = "FacultyDirector"
        const val PRESIDENT_OF_COMISSION = "PresidentOfComission"
        const val ADMIN = "Admin"
    }
}
