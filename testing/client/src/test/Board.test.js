import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Board from "../app/Board";
import {getByTestId} from "@testing-library/dom";
import TestService from "./TestService";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders board with empty squares and with statistics", () => {
    act(() => {
        render(
            <Board
                xName={"xName"}
                oName={"oName"}

                xScore={2}
                oScore={3}

                service={TestService}
            />, container);
    });
    expect(container.textContent).toBe("xName 2-3 oNameNext player: xName (X)Finish");
});

it("renders square's value and change next player name", () => {
    act(() => {
        render(
            <Board
                xName={"xName"}
                oName={"oName"}

                xScore={2}
                oScore={3}

                service={TestService}
            />, container);
    });
    expect(container.textContent).toBe("xName 2-3 oNameNext player: xName (X)Finish");

    const button0 = getByTestId(container, "0")
    const button1 = getByTestId(container, "1")
    const button2 = getByTestId(container, "2")

    act(() => {
        button0.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 2-3 oNameNext player: oName (O)XFinish");

    act(() => {
        button1.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 2-3 oNameNext player: xName (X)XOFinish");

    act(() => {
        button2.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 2-3 oNameNext player: oName (O)XOXFinish");
});

it("renders repeat button on win, renders winner name, repeate button works", () => {
    act(() => {
        render(
            <Board
                xName={"xName"}
                oName={"oName"}

                xScore={5}
                oScore={5}

                service={TestService}
            />, container);
    });
    expect(container.textContent).toBe("xName 5-5 oNameNext player: xName (X)Finish");

    const buttons = Array(9).fill(null).map((_, i) => getByTestId(container, i.toString()));
    const xWinStrategy = [0, 1, 3, 4, 6];

    // todo: why for-loop doesn't work?
    // act(() => {
    //     for (let i = 0; i < xWinStrategy.length; i++) {
    //         const button = buttons[xWinStrategy[i]];
    //         button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    //     }
    // })
    // expect(container.textContent).toBe("xName 6-5 oNameWinner: xName (O)XOXOXFinish");

    act(() => {
        buttons[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 5-5 oNameNext player: oName (O)XFinish");

    act(() => {
        buttons[1].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 5-5 oNameNext player: xName (X)XOFinish");

    act(() => {
        buttons[3].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 5-5 oNameNext player: oName (O)XOXFinish");

    act(() => {
        buttons[4].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 5-5 oNameNext player: xName (X)XOXOFinish");

    act(() => {
        buttons[6].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 6-5 oNameWinner is xName (X)XOXOXFinishRepeat");

    const repeatButton = getByTestId(container, "repeat_button");
    act(() => {
        repeatButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(container.textContent).toBe("xName 6-5 oNameNext player: oName (O)Finish");
});
