/**
 * @jest-environment jsdom
 */

import React, { render, screen } from "@testing-library/react";
import App from "../App.js";

beforeEach(() => {
	render(<App />);
});

it("Calendar (empty) matches snapshot", () => {
	expect(screen.getByTestId("calendar")).toMatchSnapshot();
});
