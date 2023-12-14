package it.polito.server.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource


@Configuration
@EnableWebSecurity
class WebSecurityConfig {
    @Autowired
    private lateinit var jwtAuthConverter: JwtAuthConverter
    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests {
            it.requestMatchers(HttpMethod.OPTIONS,"/API/**").permitAll()
            it.requestMatchers(HttpMethod.PUT,"/API/**").permitAll()
            it.requestMatchers(HttpMethod.PUT,"/API/virtualclock/**").permitAll()
            it.requestMatchers(HttpMethod.POST,"/API/virtualclock/**").permitAll()
            it.requestMatchers(HttpMethod.GET,"/API/virtualclock/**").permitAll()
            it.requestMatchers(HttpMethod.POST,"/API/chat/messages/").permitAll()
            it.requestMatchers(HttpMethod.POST,"/API/login").permitAll()



            it.requestMatchers(HttpMethod.PUT, "/API/bySecretary/accept/*").hasAnyRole(SECRETARY)
            it.requestMatchers(HttpMethod.PUT, "/API/bySecretary/reject/*").hasAnyRole(SECRETARY)
            it.requestMatchers(HttpMethod.PUT, "/API/bySupervisor/accept/*").hasAnyRole(PROFESSOR)
            it.requestMatchers(HttpMethod.PUT, "/API/bySupervisor/reject/*").hasAnyRole(PROFESSOR)
            it.requestMatchers(HttpMethod.GET, "/API/professors/*").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.GET, "/API/professors/**").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.DELETE,"/API/appliedProposal/*").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.PUT,"/API/appliedProposal/**").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.GET, "/realms/").permitAll()
            it.requestMatchers(HttpMethod.GET,"/API/**").authenticated()
            it.requestMatchers(HttpMethod.POST,"/API/**").authenticated()
            it.requestMatchers(HttpMethod.PUT,"/API/**").authenticated()
            it.requestMatchers(HttpMethod.DELETE,"/API/**").authenticated()
            it.requestMatchers(HttpMethod.GET,"/**").permitAll()
        }



        http.csrf { csrf->
            csrf.ignoringRequestMatchers("/API/**")
        }
            http.oauth2ResourceServer { oauth->
                oauth.jwt{ jwt->
                    jwt.jwtAuthenticationConverter (jwtAuthConverter)
                }
            }

            http.sessionManagement { sessionManagement->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
//        http.oauth2ResourceServer()
//            .jwt()
//            .jwtAuthenticationConverter(jwtAuthConverter)
//        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
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
        const val PROFESSOR = "PROFESSOR"
        const val STUDENT = "STUDENT"
        const val SECRETARY = "SECRETARY"
    }
}

