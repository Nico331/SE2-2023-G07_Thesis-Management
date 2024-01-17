package it.polito.server

//import org.springframework.web.multipart.MultipartFile
//import java.io.ByteArrayInputStream
//import java.io.File
//import java.io.InputStream
//import java.io.Serializable
//
//class ByteArrayMultipartFile(
//    private val content: ByteArray,
//    private val name: String,
//    private val originalFilename: String,
//    private val contentType: String
//) : MultipartFile, Serializable {
//
//    @Transient
//    private var inputStream: InputStream? = null
//
//    override fun getName(): String = name
//
//    override fun getOriginalFilename(): String = originalFilename
//
//    override fun getContentType(): String = contentType
//
//    override fun isEmpty(): Boolean = content.isEmpty()
//
//    override fun getSize(): Long = content.size.toLong()
//
//    override fun getBytes(): ByteArray = content.clone()
//    override fun transferTo(dest: File) {
//        TODO("Not yet implemented")
//    }
//
//    override fun getInputStream(): InputStream {
//        if (inputStream == null) {
//            inputStream = ByteArrayInputStream(content)
//        }
//        return inputStream!!
//    }
//
//    override fun transferTo(dest: java.nio.file.Path) {
//        throw UnsupportedOperationException("Not implemented")
//    }
//}
