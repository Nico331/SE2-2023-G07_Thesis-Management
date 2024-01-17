package it.polito.server

import it.polito.server.courses.CourseController
import it.polito.server.courses.CourseDTO
import it.polito.server.courses.CourseService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus


class CourseTests {

    private lateinit var courseController: CourseController
    private lateinit var courseService: CourseService
    @BeforeEach
    fun setup() {
        courseService = mock(CourseService::class.java)
        courseController = CourseController(courseService)
    }

    @Test
    fun testCreateCourse() {
        val course = CourseDTO(null, "name", "L1")
        `when`(courseService.createCourse(course)).thenReturn(course)

        val response = courseController.createCourse(course)
        assert(response.statusCode == HttpStatus.CREATED)
        assert(response.body == course)
    }

    @Test
    fun testGetAllCourses() {
        val course1 = CourseDTO("id1", "name1", "L1")
        val course2 = CourseDTO("id2", "name2", "L2")
        val courses = listOf(course1, course2)
        `when`(courseService.getAllCourses()).thenReturn(courses)

        val response = courseController.getAllCourses()
        assert(response.statusCode == HttpStatus.OK)
        assert(response.body == courses)
    }

    @Test
    fun testGetAllCoursesEmpty() {
        val courses = listOf<CourseDTO>()
        `when`(courseService.getAllCourses()).thenReturn(courses)

        val response = courseController.getAllCourses()
        assert(response.statusCode == HttpStatus.NOT_FOUND)
        assert(response.body == courses)
    }

    @Test
    fun testGetCourse() {
        val course = CourseDTO("id", "name", "L1")
        `when`(courseService.findCourseById("id")).thenReturn(course)

        val response = courseController.getCourse("id")
        assert(response.statusCode == HttpStatus.OK)
        assert(response.body == course)
    }

    @Test
    fun testGetCourseNotFound() {
        `when`(courseService.findCourseById("id")).thenReturn(null)

        val response = courseController.getCourse("id")
        assert(response.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testDeleteCourse() {
        `when`(courseService.findCourseById("id")).thenReturn(CourseDTO("id", "name", "L1"))
        val response = courseController.deleteCourse("id")
        assert(response.statusCode == HttpStatus.OK)
        assert(response.body == "course with ID id successfully deleted.")
    }

    @Test
    fun testDeleteCourseNotFound() {
        `when`(courseService.findCourseById("id")).thenReturn(null)
        val response = courseController.deleteCourse("id")
        assert(response.statusCode == HttpStatus.NOT_FOUND)
        assert(response.body == "this course does NOT EXIST")
    }
}