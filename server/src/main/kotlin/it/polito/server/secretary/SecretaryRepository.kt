package it.polito.server.secretary

import org.springframework.data.mongodb.repository.MongoRepository

interface SecretaryRepository : MongoRepository<Secretary,String>{

}