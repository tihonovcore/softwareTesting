package com.github.tihonovcore.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HeartbeatController {
    @GetMapping("/")
    fun heartbeat(): String {
        return "alive"
    }
}
