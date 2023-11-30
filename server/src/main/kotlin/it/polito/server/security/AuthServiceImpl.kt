package it.polito.server.security

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.transaction.Transactional
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.client.RestTemplate
import java.io.File
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtClaimNames
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter

@Service
@Transactional
class AuthServiceImpl(): AuthService {
    override fun authenticate(credentials: LoginCredentials): String? {
        // Send a request to Keycloak to validate the user's credentials

        val keycloakUrl = if (isRunningInDockerContainer()) {
            "http://custom_keycloak:8080/realms/ThesisManagementRealm/protocol/openid-connect/token"
        } else {
            "http://localhost:8082/realms/ThesisManagementRealm/protocol/openid-connect/token"
        }

        val restTemplate = RestTemplate()

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED

        val requestBody = LinkedMultiValueMap<String, String>()
        requestBody.add("grant_type", "password")
        requestBody.add("client_id", "springboot-keycloak-client")
        requestBody.add("username", credentials.username)
        requestBody.add("password", credentials.password)

        val requestEntity = HttpEntity(requestBody, headers)

        val responseEntity = restTemplate.postForEntity(keycloakUrl, requestEntity, KeycloakResponse::class.java)

        val keycloakResponse = responseEntity.body ?: return null
        return if (responseEntity.statusCode == HttpStatus.OK && keycloakResponse.accessToken != null) {
            keycloakResponse.accessToken
        } else {
            null
        }
    }

    override fun getAdminToken(): String? {
        val keycloakUrl = if (isRunningInDockerContainer()) {
            "http://localhost:8082/realms/master/protocol/openid-connect/token"
        } else {
            "http://custom_keycloak:8080/realms/master/protocol/openid-connect/token"
        }
        val restTemplate = RestTemplate()

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED

        val requestBody = LinkedMultiValueMap<String, String>()
        requestBody.add("grant_type", "password")
        requestBody.add("client_id", "admin-cli")
        requestBody.add("username", "admin")
        requestBody.add("password", "password")

        val requestEntity = HttpEntity(requestBody, headers)

        val responseEntity = restTemplate.postForEntity(keycloakUrl, requestEntity, KeycloakResponse::class.java)

        val keycloakResponse = responseEntity.body ?: return null

        return if (responseEntity.statusCode == HttpStatus.OK && keycloakResponse.accessToken != null) {
            keycloakResponse.accessToken
        } else {
            null
        }
    }

}

data class LoginCredentials(
    val username: String,
    val password: String
)

data class KeycloakResponse(
    @JsonProperty("access_token")
    val accessToken: String?,
    @JsonProperty("expires_in")
    val expiresIn: Long?,
    @JsonProperty("refresh_expires_in")
    val refreshExpiresIn: Long?,
    @JsonProperty("refresh_token")
    val refreshToken: String?,
    @JsonProperty("token_type")
    val tokenType: String?,
    @JsonProperty("not_before_policy")
    val notBeforePolicy: Long?,
    @JsonProperty("session_state")
    val sessionState: String?,
    @JsonProperty("scope")
    val scope: String?
)

data class JwtResponse(
    val jwt: String
)

fun isRunningInDockerContainer(): Boolean {
    val cgroupFile = File("/proc/self/cgroup")
    return cgroupFile.exists() && cgroupFile.readText().contains("docker")
}
