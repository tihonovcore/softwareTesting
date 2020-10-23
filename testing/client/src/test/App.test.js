import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";

import {getByTestId} from "@testing-library/dom";
import Game from "../app/App";
import TestService from "./TestService";
import UnavailableTestService from "./UnavailableTestService";

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

it("render login view", () => {
  act(() => {
    render(<Game/>, container);
  });
  expect(container.textContent).toBe("X player name:O player name:");
});

it("login then loading screen", () => {
  act(() => {
    render(<Game service={UnavailableTestService}/>, container);
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
  expect(container.textContent).toBe("Loading");
})

it("win game press finish", () => {
  act(() => {
    render(<Game service={TestService}/>, container);
  });
  expect(container.textContent).toBe("X player name:O player name:");

  let loginButton = getByTestId(container, "login");
  let xInput = getByTestId(container, "x_player_name");
  let oInput = getByTestId(container, "o_player_name");

  //login
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
  expect(container.textContent).toBe("wex 50-60 exortNext player: wex (X)Finish");

  //win game
  const buttons = Array(9).fill(null).map((_, i) => getByTestId(container, i.toString()));
  const xWinStrategy = [0, 1, 3, 4, 6];

  act(() => {
    buttons[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
  })
  expect(container.textContent).toBe("wex 50-60 exortNext player: exort (O)XFinish");

  act(() => {
    buttons[1].dispatchEvent(new MouseEvent('click', {bubbles: true}));
  })
  expect(container.textContent).toBe("wex 50-60 exortNext player: wex (X)XOFinish");

  act(() => {
    buttons[3].dispatchEvent(new MouseEvent('click', {bubbles: true}));
  })
  expect(container.textContent).toBe("wex 50-60 exortNext player: exort (O)XOXFinish");

  act(() => {
    buttons[4].dispatchEvent(new MouseEvent('click', {bubbles: true}));
  })
  expect(container.textContent).toBe("wex 50-60 exortNext player: wex (X)XOXOFinish");

  act(() => {
    buttons[6].dispatchEvent(new MouseEvent('click', {bubbles: true}));
  })
  expect(container.textContent).toBe("wex 51-60 exortWinner is wex (X)XOXOXFinishRepeat");

  const finishButton = getByTestId(container, "finish_button");
  act(() => {
    finishButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  })
  expect(container.textContent).toBe("X player name:O player name:");

  //login again and check updated score
  loginButton = getByTestId(container, "login");
  xInput = getByTestId(container, "x_player_name");
  oInput = getByTestId(container, "o_player_name");

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
  expect(container.textContent).toBe("wex 51-60 exortNext player: wex (X)Finish");
});
