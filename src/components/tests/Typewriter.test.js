import React from "react";
import { render, unmountComponentAtNode } from "@testing-library/react";
import Typewriter from "../utils/Typewriter";

describe("Typewriter", () => {
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

  it("displays text one character at a time", async () => {
    const text = "Empower your child";
    const { getByText } = render(<Typewriter text={{ text }} />, container);

    let displayedText = "";
    for (let i = 0; i <= text.length; i++) {
      displayedText = text.slice(0, i);
      await wait(150);
      expect(getByText(displayedText)).toBeInTheDocument();
    }
  });
});
