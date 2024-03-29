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
    private val apis = "/API/**"
    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeHttpRequests {
            it.requestMatchers("/ws/**", "/socket.io/**").permitAll()
            it.requestMatchers(HttpMethod.OPTIONS,).permitAll()
            it.requestMatchers(HttpMethod.PUT,apis).permitAll()
            it.requestMatchers(HttpMethod.GET,"/websocket/**").permitAll()
            it.requestMatchers(HttpMethod.GET,"/index.html/**").permitAll()

            it.requestMatchers(HttpMethod.PUT,"/API/virtualclock/**").permitAll()
            it.requestMatchers(HttpMethod.POST,"/API/virtualclock/**").permitAll()
            it.requestMatchers(HttpMethod.GET,"/API/virtualclock/**").permitAll()

            it.requestMatchers(HttpMethod.POST,"/API/login").permitAll()

            it.requestMatchers(HttpMethod.GET,"/API/forums/**").authenticated()
            it.requestMatchers(HttpMethod.POST,"/API/forums/**").hasAnyRole(PROFESSOR)
            it.requestMatchers(HttpMethod.DELETE,"/API/forums/**").hasAnyRole(PROFESSOR)
            it.requestMatchers(HttpMethod.PUT,"/API/forums/**").hasAnyRole(PROFESSOR)

            it.requestMatchers(HttpMethod.PUT, "/API/requestProposals/bySecretary/reject/*").hasAnyRole(SECRETARY)
            it.requestMatchers(HttpMethod.PUT, "/API/requestProposals/bySecretary/accept/*").hasAnyRole(SECRETARY)
            it.requestMatchers(HttpMethod.PUT, "/API/requestProposals/bySupervisor/accept/*").hasAnyRole(PROFESSOR)
            it.requestMatchers(HttpMethod.PUT, "/API/requestProposals/bySupervisor/reject/*").hasAnyRole(PROFESSOR)

            it.requestMatchers(HttpMethod.GET, "/API/professors").permitAll()
            it.requestMatchers(HttpMethod.GET, "/API/professors/**").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.DELETE,"/API/appliedProposal/*").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.PUT,"/API/appliedProposal/**").hasAnyRole(PROFESSOR, STUDENT,SECRETARY)
            it.requestMatchers(HttpMethod.GET, "/realms/").permitAll()
            it.requestMatchers(HttpMethod.GET,apis).authenticated()
            it.requestMatchers(HttpMethod.POST,apis).authenticated()
            it.requestMatchers(HttpMethod.PUT,apis).authenticated()
            it.requestMatchers(HttpMethod.DELETE,apis).authenticated()
            it.requestMatchers(HttpMethod.GET,"/**").permitAll()
        }



        http.csrf { csrf->
            csrf.ignoringRequestMatchers(apis)
            csrf.disable() // Disabilita CSRF per i WebSocket
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
        configuration.allowedOrigins = mutableListOf("http://localhost:3000/socket.io","ws://localhost:3000","ws://localhost:3000/ws")
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

