package it.polito.server.security.saml;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final Keycloak keycloak;
    private final String realm;

    public UserService(Keycloak keycloak, @Value("${keycloak.realm}") String realm) {
        this.keycloak = keycloak;
        this.realm = realm;
    }

    public List<UserRepresentation> findByUsername(String username) {
        return keycloak.realm(realm).users().search(username);
    }

    public RoleRepresentation findRoleByName(String roleName) {
        return keycloak.realm(realm).roles().get(roleName).toRepresentation();
    }

    public List<String> getRoleById(String id) {
        return keycloak.realm(realm).users().get(id).roles().realmLevel().listAll()
                .stream().map(Object::toString).collect(Collectors.toList());
    }


}
