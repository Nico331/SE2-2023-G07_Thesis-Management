package it.polito.server

import org.springframework.core.convert.converter.Converter
import java.util.Date

import java.time.ZonedDateTime
import java.time.ZoneId

import org.springframework.context.annotation.Bean
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.convert.MappingMongoConverter
import org.springframework.data.mongodb.core.convert.MongoCustomConversions
import org.springframework.data.mongodb.core.mapping.MongoMappingContext
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver
import org.springframework.data.mongodb.MongoDatabaseFactory

class DateToZonedDateTimeConverter : Converter<Date, ZonedDateTime> {
    override fun convert(source: Date): ZonedDateTime? {
        return source?.toInstant()?.atZone(ZoneId.systemDefault())
    }
}

class ZonedDateTimeToDateConverter : Converter<ZonedDateTime, Date> {
    override fun convert(source: ZonedDateTime): Date? {
        return Date.from(source.toInstant())
    }
}



@Bean
fun customConversions(): MongoCustomConversions {
    val converters = listOf(DateToZonedDateTimeConverter(), ZonedDateTimeToDateConverter())
    return MongoCustomConversions(converters)
}

@Bean
fun mongoTemplate(mongoDbFactory: MongoDatabaseFactory, context: MongoMappingContext): MongoTemplate {
    val converter = MappingMongoConverter(DefaultDbRefResolver(mongoDbFactory), context)
    converter.customConversions = customConversions()
    converter.afterPropertiesSet()
    return MongoTemplate(mongoDbFactory, converter)
}
