package com.github.tihonovcore.dao

import com.github.tihonovcore.model.User

interface UserDao {
    fun getUser(userName: String): User
    fun addUser(user: User)
}
