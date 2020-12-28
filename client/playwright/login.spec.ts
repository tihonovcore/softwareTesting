import { it, expect } from "@playwright/test";

it("success login", async ({page}) => {
    const x_name = "fill"
    const o_name = "kirkorov"

    await page.goto("http://localhost:3000/");
    await page.fill('[data-testid=x_player_name]', x_name);
    await page.fill('[data-testid=o_player_name]', o_name);
    await page.click('"Submit"');

    const msg = await page.innerText("[class=score]");
    expect(msg).toMatch(RegExp(x_name + " [\\d]+-[\\d]+ " + o_name));
});
