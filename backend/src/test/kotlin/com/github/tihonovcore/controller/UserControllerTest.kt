package com.github.tihonovcore.controller

import com.github.tihonovcore.dao.UserDao
import com.github.tihonovcore.model.User
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(UserController::class)
internal class UserControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var dao: UserDao

    @Test
    fun testGetScore() {
        val john = User("john", 39)
        val adam = User("adam", 45)

        `when`(dao.getUser("john")).thenReturn(john)
        `when`(dao.getUser("adam")).thenReturn(adam)

        mockMvc.perform(get("/score?userName=john")).andExpect(content().string("39"))
        mockMvc.perform(get("/score?userName=adam")).andExpect(content().string("45"))
    }

    @Test
    fun testUpdate() {
        val markul = User("markul", 27)
        val depo = User("depo", 29)

        val result = mutableListOf<String>()
        `when`(dao.addUser(eq(markul))).then { result.add("mark") }
        `when`(dao.addUser(eq(depo))).then { result.add("depo") }

        mockMvc.perform(post("/update?userName=markul&newScore=27")).andExpect(status().isOk)
        mockMvc.perform(post("/update?userName=depo&newScore=29")).andExpect(status().isOk)

        assertEquals(listOf("mark", "depo"), result)
    }

    private fun <T> eq(obj: T): T = Mockito.eq<T>(obj)
}
