package com.github.tihonovcore.config

import com.github.tihonovcore.dao.UserJdbcDao
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class JdbcDaoContextConfiguration {
    @Bean
    fun userJdbcDao() = UserJdbcDao()
}
