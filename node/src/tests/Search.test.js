/**
 * @jest-environment jsdom
 */

import React, { render, screen } from "@testing-library/react";
import App from "../App.js";
// import Search from "../components/Search/Search";

beforeEach(() => {
	render(<App />);
});

it("Search bar matches snapshot", () => {
	expect(screen.getByTestId("search-bar")).toMatchInlineSnapshot(`
<form
  class="add-form"
  data-testid="search-bar"
>
  <div
    class="outer-form-control"
  >
    <div
      class="rbt"
      style="outline: none; position: relative;"
      tabindex="-1"
    >
      <div
        class="rbt-input-multi form-control rbt-input"
        tabindex="-1"
      >
        <div
          class="rbt-input-wrapper"
        >
          <div
            style="display: flex; flex: 1; height: 100%; position: relative;"
          >
            <input
              aria-autocomplete="list"
              aria-haspopup="listbox"
              autocomplete="off"
              class="rbt-input-main"
              placeholder="Select a course..."
              style="background-color: transparent; border: 0px; box-shadow: none; cursor: inherit; outline: none; padding: 0px; width: 100%; z-index: 1;"
              type="text"
              value=""
            />
            <input
              aria-hidden="true"
              class="rbt-input-hint"
              readonly=""
              style="background-color: transparent; border-color: transparent; box-shadow: none; color: rgba(0, 0, 0, 0.54); left: 0px; pointer-events: none; position: absolute; top: 0px; width: 100%;"
              tabindex="-1"
              value=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <input
    class="btn btn-success"
    type="submit"
    value="Load Courses"
  />
</form>
`);
});
