package com.github.tihonovcore

import org.springframework.web.bind.annotation.*

@RestController
class TmpController {
    private val map = mutableMapOf<String, Int>()

    @GetMapping("/score")
    fun getScore(@RequestParam("userName") userName: String): Int {
        map.putIfAbsent(userName, 0)

        val score = map[userName]
        println("user: $userName")
        println("score: $score")

        return score!!
    }

    @PostMapping("/update")
    fun updateScore(
            @RequestParam("userName") userName: String,
            @RequestParam("newScore") newScore: Int
    ) {
        map.putIfAbsent(userName, 0)

        val score = map[userName]
        println("user: $userName")
        println("score: $score -> $newScore")
        map[userName] = newScore
    }
}
