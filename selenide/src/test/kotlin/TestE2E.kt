import com.codeborne.selenide.Condition.*
import com.codeborne.selenide.Selenide.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import java.time.Duration


class TestE2E {
    @BeforeEach
    fun login() {
        open("http://localhost:3000")
        element(xPlayer).value = "mike"
        element(oPlayer).value = "nick"
        element(login).click()

        element(score).shouldBe(exist, Duration.ofMillis(1000))
        element(status).shouldBe(exist, Duration.ofMillis(1000))
    }


    @Test
    fun testXWinStrategy() {
        winStrategy.map(::getSquareXpath).forEach { element(By.xpath(it)).click() }
        element(status).shouldBe(exactText("Winner is mike (X)"))
    }

    @Test
    fun testRepeat() {
        winStrategy.map(::getSquareXpath).forEach { element(By.xpath(it)).click() }
        element(status).shouldBe(exactText("Winner is mike (X)"))

        element(repeat).click()

        winStrategy.map(::getSquareXpath).forEach { element(By.xpath(it)).click() }
        element(status).shouldBe(exactText("Winner is nick (O)"))
    }

    @Test
    fun testFinish() {
        element(finish).click()

        element(xPlayer).shouldBe(exist, Duration.ofMillis(1000))
        element(oPlayer).shouldBe(exist, Duration.ofMillis(1000))
        element(login).shouldBe(exist, Duration.ofMillis(1000))
    }

    private fun getSquareXpath(index: Int): String {
        val col = index % 3 + 1
        val row = index / 3 + 3
        return "//*[@id=\"root\"]/div/div[$row]/button[$col]"
    }

    private val winStrategy = listOf(6, 7, 0, 4, 2, 5, 1)

    private val xPlayer = By.xpath("//*[@id=\"root\"]/div/form/label[1]/input")
    private val oPlayer = By.xpath("//*[@id=\"root\"]/div/form/label[2]/input")
    private val login = By.xpath("//*[@id=\"root\"]/div/form/input")
    private val score = By.xpath("//*[@id=\"root\"]/div/div[1]")
    private val status = By.xpath("//*[@id=\"root\"]/div/div[2]")
    private val finish = By.xpath("//*[@id=\"root\"]/div/div[6]/button[1]")
    private val repeat = By.xpath("//*[@id=\"root\"]/div/div[6]/button[2]")
}
