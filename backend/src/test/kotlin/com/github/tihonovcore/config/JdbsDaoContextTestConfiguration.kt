package com.github.tihonovcore.config

import com.github.tihonovcore.dao.UserJdbcDao
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean

@TestConfiguration
class JdbcDaoContextTestConfiguration {
    @Bean
    fun userJdbcDao() = UserJdbcDao()
}
