package com.github.tihonovcore.dao

import com.github.tihonovcore.model.User
import com.github.tihonovcore.sql.SqlFacade
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

internal class DaoTest {
    private val databaseUrl = "jdbc:sqlite:test.db"

    private lateinit var dao: UserJdbcDao

    @BeforeEach
    fun setUpDao() {
        dao = UserJdbcDao(databaseUrl)
    }

    @BeforeEach
    @AfterEach
    fun clearDB() {
        SqlFacade<Unit>(databaseUrl).databaseAction { statement ->
            val create = """create table if not exists Users
                        |(
                        |  username varchar(50) not null primary key,
                        |  score int not null default 0
                        |);
            """.trimMargin()
            val clear = "delete from Users where true;"

            statement.executeUpdate(create)
            statement.executeUpdate(clear)
        }
    }

    @Test
    fun testGetUser() {
        val users = listOf(User("egor", 40), User("vlad", 50))
        fillDB(users)

        val egor = dao.getUser("egor")
        val vlad = dao.getUser("vlad")

        assertThat(egor.score == 40)
        assertThat(vlad.score == 50)

        checkDatabaseConsistency(users)
    }

    @Test
    fun testAddUser() {
        val users = listOf(User("lena", 76), User("anel", 67))
        fillDB(users)

        val gena = User("gena", 20102)
        val dasha = User("dasha", 23354)
        val newUsers = listOf(gena, dasha)

        dao.addUser(gena)
        dao.addUser(dasha)

        checkDatabaseConsistency(users + newUsers)
    }

    private fun fillDB(users: List<User>) {
        val values = users
                .map { "('${it.name}', ${it.score})" }
                .fold("", { l, r -> "$l, $r" })
                .drop(2)

        SqlFacade<Unit>(databaseUrl).databaseAction { statement ->
            statement.executeUpdate("insert into Users (username, score) values $values;")
        }
    }

    private fun checkDatabaseConsistency(users: List<User>) {
        val realUsers = SqlFacade<List<User>>(databaseUrl).databaseAction { statement ->
            val usersList = mutableListOf<User>()

            val result = statement.executeQuery("select * from Users;")
            while (result.next()) {
                val name = result.getString("username")
                val score = result.getInt("score")
                usersList += User(name, score)
            }

            usersList
        }

        assertThat(users.equals(realUsers))
    }
}
