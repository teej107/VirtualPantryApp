package com.teej107.virtualpantry.web

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created by teej107 on 1/22/2018.
 */
@Controller
class RootController {

    @RequestMapping(value = ["/"])
    fun index(): String = "index"
}
