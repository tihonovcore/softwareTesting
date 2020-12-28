package com.github.tihonovcore.controller

import com.github.tihonovcore.dao.UserDao
import com.github.tihonovcore.model.User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController(
    val userDao: UserDao
) {
    @GetMapping("/score")
    fun getScore(@RequestParam("userName") userName: String): Int {
        return userDao.getUser(userName).score
    }

    @PostMapping("/update")
    fun updateScore(
        @RequestParam("userName") userName: String,
        @RequestParam("newScore") newScore: Int
    ) {
        userDao.addUser(User(userName, newScore))
    }
}
