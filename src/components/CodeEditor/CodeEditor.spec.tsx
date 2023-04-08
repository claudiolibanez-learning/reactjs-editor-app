import "@testing-library/jest-dom";

import {
  screen,
  render,
} from "@testing-library/react";

import { CodeEditor } from "./CodeEditor";

describe("Editor", () => {
  it("should be rendered TextArea", async () => {
    render(
      <CodeEditor
      />,
    );

    screen.getByRole("textbox");

  });
});