package com.github.tihonovcore.dao

import com.github.tihonovcore.model.User
import com.github.tihonovcore.sql.SqlFacade

open class UserJdbcDao(
    val databaseUrl: String = "jdbc:sqlite:xo_users.db"
) : UserDao {
    override fun getUser(userName: String): User {
        return SqlFacade<User>(databaseUrl).databaseAction { statement ->
            val sql = "select * from Users where username = '$userName';"
            val result = statement.executeQuery(sql)

            if (result.next()) {
                val name = result.getString("username")
                val score = result.getInt("score")
                User(name, score)
            } else {
                User(userName)
            }
        }
    }

    override fun addUser(user: User) {
        SqlFacade<Unit>(databaseUrl).databaseAction { statement ->
            val remove = "delete from Users where username = '${user.name}';"
            val update = "insert into Users (username, score) values ('${user.name}', ${user.score});"

            statement.executeUpdate(remove)
            statement.executeUpdate(update)
        }
    }

    init {
        SqlFacade<Unit>(databaseUrl).databaseAction { statement ->
            val sql = """create table if not exists Users
                        |(
                        |  username varchar(50) not null primary key,
                        |  score int not null default 0
                        |);
            """.trimMargin()

            statement.executeUpdate(sql)
        }
    }
}
