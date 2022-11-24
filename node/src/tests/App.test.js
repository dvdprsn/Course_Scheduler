/**
 * @jest-environment jsdom
 */

import React, { render, screen } from "@testing-library/react";
import App from "../App.js";

beforeEach(() => {
	render(<App />);
});

it("App matches snapshot", () => {
	expect(screen.getByTestId("App")).toMatchSnapshot();
});

it("Load Courses button is visible", () => {
	const submitBtn = screen.getByText("Load Courses");
	expect(submitBtn).toBeVisible();
});

it("Clear calendar button is visible", () => {
	const clearBtn = screen.getByText("Clear Calendar");
	expect(clearBtn).toBeVisible();
});

it("Calendar is visible", () => {
	const calendar = screen.getByTestId("calendar");
	expect(calendar).toBeVisible();
});
