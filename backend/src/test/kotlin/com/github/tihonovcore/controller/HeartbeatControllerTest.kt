package com.github.tihonovcore.controller

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
internal class HeartbeatControllerTest (
    @LocalServerPort val port: Int
) {
    @Autowired
    private lateinit var rest: TestRestTemplate

    @Test
    fun testHeartbeat() {
        val answer = rest.getForObject("http://localhost:$port", String::class.java)
        assertThat(answer.contains("alive"))
    }
}
