import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {getByTestId} from "@testing-library/dom";
import Login from "../app/Login";
import TestService from "./TestService";

let container = null;
beforeEach(() => {
    TestService.clean()

    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("render login view", () => {
    act(() => {
        render(<Login/>, container);
    });
    expect(container.textContent).toBe("X player name:O player name:");
});

it("success login", () => {
    let xScore = null
    let oScore = null
    const setX = (x) => xScore = x
    const setO = (o) => oScore = o

    act(() => {
        render(<Login setXScore={setX} setOScore={setO} service={TestService}/>, container);
    });
    expect(container.textContent).toBe("X player name:O player name:");

    const loginButton = getByTestId(container, "login");
    const xInput = getByTestId(container, "x_player_name");
    const oInput = getByTestId(container, "o_player_name");

    act(() => {
        xInput.value = "wex";
        ReactTestUtils.Simulate.change(xInput);
    })

    act(() => {
        oInput.value = "exort";
        ReactTestUtils.Simulate.change(oInput);
    })

    act(() => {
        loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    })
    expect(xScore).toBe(50)
    expect(oScore).toBe(60)
});
