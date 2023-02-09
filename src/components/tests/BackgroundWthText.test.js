import React from "react";
import { render, cleanup } from "@testing-library/react";
import BackgroundWithText from "../utils/BackgroundWithText";

afterEach(cleanup);

describe("BackgroundWithText", () => {
  it("renders the children passed to it", () => {
    const text = "Hello World";
    const { getByText } = render(
      <BackgroundWithText>
        <div>{text}</div>
      </BackgroundWithText>
    );
    expect(getByText(text)).toBeInTheDocument();
  });

  it("renders the svg element", () => {
    const { getByTestId } = render(
      <BackgroundWithText>
        <div>Hello World</div>
      </BackgroundWithText>
    );
    expect(getByTestId("eseuve")).toBeInTheDocument();
  });

  it("renders the path element inside the svg", () => {
    const { getByTestId } = render(
      <BackgroundWithText>
        <div>Hello World</div>
      </BackgroundWithText>
    );
    expect(getByTestId("path")).toBeInTheDocument();
  });
});
