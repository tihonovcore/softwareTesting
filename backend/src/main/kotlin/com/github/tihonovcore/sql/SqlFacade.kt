package com.github.tihonovcore.sql

import java.sql.DriverManager
import java.sql.Statement

class SqlFacade(private val testDatabaseUrl: String) {
    fun <T> databaseAction(action: (Statement) -> T): T {
        return DriverManager.getConnection(testDatabaseUrl).use { c ->
            c.createStatement().use(action)
        }
    }
}
