package it.polito.server.configuration

import org.springframework.boot.web.server.ErrorPage
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebApplicationConfig : WebMvcConfigurer {

    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/notFound").setViewName("forward:/index.html");
    }

    @Bean
    fun containerCustomizer(): WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
        return WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
                factory -> factory?.addErrorPages(ErrorPage(HttpStatus.NOT_FOUND, "/notFound"));
        };
    }

}
@Configuration
//@EnableWebMvc
class WebConfig: WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    }
}
//
//@Configuration
//@EnableWebMvc
//class CorsConfiguration : WebMvcConfigurer {
//    @Bean
//    fun corsConfigurer(): WebMvcConfigurer {
//        return object : WebMvcConfigurer {
//            override fun addCorsMappings(registry: CorsRegistry) {
//                registry.addMapping("/API/**")
//                    .allowedOrigins("**")
//                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//            }
//        }
//    }
//}
