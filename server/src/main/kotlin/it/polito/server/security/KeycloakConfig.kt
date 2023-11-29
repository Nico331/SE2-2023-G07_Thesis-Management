package it.polito.server.security

import org.keycloak.OAuth2Constants
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.KeycloakBuilder
import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.io.File

@Component
object KeycloakConfig {
    private var keycloak: Keycloak? = null
    private var serverUrl = if (isRunningInDockerContainer()){
        "http://keycloakContainer:8082"
    }else{
        "http://localhost:8082"
    }
    var realm = "ThesisManagementRealm"
    private var clientId = "springboot-keycloak-client"
    private var password = "admin"
    private var username = "password"
    fun getInstance(): Keycloak {
        if (keycloak == null) {
            keycloak = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realm)
                .grantType(OAuth2Constants.PASSWORD)
                .username(username)
                .password(password)
                .clientId(clientId)
                //.clientSecret(clientSecret)
                .resteasyClient(
                    ResteasyClientBuilderImpl()
                        .connectionPoolSize(10)
                        .build()
                )
                .build()
        }
        return keycloak!!
    }

    fun isRunningInDockerContainer(): Boolean {
        val cgroupFile = File("/proc/self/cgroup")
        return cgroupFile.exists() && cgroupFile.readText().contains("docker")
    }
}
