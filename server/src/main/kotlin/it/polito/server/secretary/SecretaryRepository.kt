package it.polito.server.secretary

import org.springframework.data.mongodb.repository.MongoRepository

interface SecretaryRepository : MongoRepository<Secretary,String>{
    fun existsSecretaryByNameAndSurnameAndEmail (name : String, surname : String, email: String) : Boolean
}