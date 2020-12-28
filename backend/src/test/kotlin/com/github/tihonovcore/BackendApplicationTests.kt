package com.github.tihonovcore

import com.github.tihonovcore.controller.UserController
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class BackendApplicationTests {
    @Autowired
    private lateinit var controller: UserController

    @Test
    fun contextLoads() {
        assertThat(controller).isNotNull
    }
}
