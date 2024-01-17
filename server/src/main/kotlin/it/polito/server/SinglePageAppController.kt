package it.polito.server

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class SinglePageAppController {
//    @RequestMapping(value = ["/{path:[^\\.]*}"])
    @RequestMapping(value = ["/{path:^(?!ws)[^\\.]*}"])
    fun redirect(): String {
            return "forward:/index.html"
        }
}
