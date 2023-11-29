package it.polito.server.security

import org.springframework.core.convert.converter.Converter
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtClaimNames
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter
import org.springframework.stereotype.Component
import java.util.stream.Collectors
import java.util.stream.Stream


@Component
class JwtAuthConverter(private val properties: JwtAuthConverterProperties) :
    Converter<Jwt?, AbstractAuthenticationToken?> {
    private val jwtGrantedAuthoritiesConverter = JwtGrantedAuthoritiesConverter()

    override fun convert(jwt: Jwt): AbstractAuthenticationToken {
        val authorities: MutableSet<GrantedAuthority>? = extractResourceRoles(jwt)?.stream()?.let {
            Stream.concat(
                jwtGrantedAuthoritiesConverter.convert(jwt)!!.stream(),
                it
            ).collect(Collectors.toSet())
        }

        return JwtAuthenticationToken(jwt, authorities, getPrincipalClaimName(jwt))
    }

    private fun getPrincipalClaimName(jwt: Jwt): String {
        var claimName: String? = JwtClaimNames.SUB
        if (properties.principalAttribute != null) {
            claimName = properties.principalAttribute
        }
        return jwt.getClaim(claimName)
    }


    private fun extractResourceRoles(jwt: Jwt): Set<SimpleGrantedAuthority>? {

        val resourceAccess = jwt.getClaim<Map<String, Any>>("resource_access")
        val resource: Map<String?, Any?>? = resourceAccess[properties.resourceId] as? Map<String?, Any?>
        val resourceRoles: Collection<String>? = resource?.get("roles") as? Collection<String>?
        return if (
            resourceAccess == null ||
            resourceAccess[properties.resourceId] == null ||
            resource?.get("roles") == null
            ) {
            setOf()
        } else {
            resourceRoles?.stream()?.map { role: String ->
                SimpleGrantedAuthority(
                    "ROLE_$role"
                )
            }?.collect(Collectors.toSet())
        }
    }
}
