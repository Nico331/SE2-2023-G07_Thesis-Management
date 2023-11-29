package it.polito.server.security

interface AuthService {

    fun authenticate(credentials: LoginCredentials): String?

    fun getAdminToken(): String?


}
