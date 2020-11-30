import { beforeEach, describe, it, expect } from "@playwright/test";

describe("test game", () => {
    const x_name = "fil"
    const o_name = "kirkorov"

    beforeEach(async ({page}) => {
        await page.goto("http://localhost:3000/");
        await page.fill('[data-testid=x_player_name]', x_name);
        await page.fill('[data-testid=o_player_name]', o_name);
        await page.click('"Submit"');
    });

    it("X, O make steps", async ({page}) => {
        let next_player = await page.innerText("[class=status]");
        expect(next_player).toMatch("Next player: " + x_name + " (X)");

        await page.click('[data-testid="1"]');
        next_player = await page.innerText("[class=status]");
        expect(next_player).toMatch("Next player: " + o_name + " (O)");

        await page.click('[data-testid="2"]');
        next_player = await page.innerText("[class=status]");
        expect(next_player).toMatch("Next player: " + x_name + " (X)");
    });

    it("double click", async ({page}) => {
        let next_player = await page.innerText("[class=status]");
        expect(next_player).toMatch("Next player: " + x_name + " (X)");

        await page.click('[data-testid="5"]');
        next_player = await page.innerText("[class=status]");
        expect(next_player).toMatch("Next player: " + o_name + " (O)");

        await page.click('[data-testid="5"]');
        next_player = await page.innerText("[class=status]");
        expect(next_player).toMatch("Next player: " + o_name + " (O)");
    });

    it("o-win strategy", async ({page}) => {
        const steps = [8, 0, 7, 6, 3, 2, 1, 4]
        for (let i = 0; i < steps.length; i++) {
            await page.click('[data-testid="' + steps[i].toString() + '"]');
        }

        const result = ['O', 'X', 'O', 'X', 'O', '', 'O', 'X', 'X']
        for (let i = 0; i < 9; i++) {
            const real = await page.innerText('[data-testid="' + i.toString() + '"]');
            expect(real).toMatch(result[i])
        }

        const winner = await page.innerText("[class=status]");
        expect(winner).toMatch("Winner is " + o_name + " (O)");
    });

    it("fast finish", async ({page}) => {
        await page.click('[data-testid="finish_button"]');

        let login_form = await page.innerText('[class=login-form]')
        expect(login_form).toMatch("X player name:\nO player name:\n")
    });
});
