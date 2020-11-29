import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Square from "../src/app/Square";

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

it("renders with or without a value", () => {
    act(() => {
        render(<Square />, container);
    });
    expect(container.textContent).toBe("");

    act(() => {
        render(<Square value={"X"}/>, container);
    });
    expect(container.textContent).toBe("X");
});
