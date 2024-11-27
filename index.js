"use strict";

const form = document.querySelector("#age-form");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const dayErr = document.querySelector("#dayErr");
const monthErr = document.querySelector("#monthErr");
const yearErr = document.querySelector("#yearErr");

const dayLabel = document.querySelector(".day-label");
const monthLabel = document.querySelector(".month-label");
const yearLabel = document.querySelector(".year-label");

const yearResult = document.querySelector(".year-result");
const monthResult = document.querySelector(".month-result");
const dayResult = document.querySelector(".day-result");

const ageCalculator = (day, month, year) => {
	const birthday = new Date(`${month}/${day}/${year}`);
	const now = new Date();

	let years = now.getFullYear() - birthday.getFullYear();
	let months = now.getMonth() - birthday.getMonth();
	let days = now.getDate() - birthday.getDate();

	if (days < 0) {
		months--;
		const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += prevMonth.getDate();
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	return { years, months, days };
};

const showError = (input, errSpan, label, errMessage) => {
	errSpan.textContent = errMessage;
	label.classList.add("invalid-label");
	input.classList.add("invalid-input");
	input.setAttribute("aria-invalid", "true");
};

const resetError = (input, errSpan, label) => {
	errSpan.textContent = "";
	label.classList.remove("invalid-label");
	input.classList.remove("invalid-input");
	input.setAttribute("aria-invalid", "false");
};

const validateInput = (input, min, max) => {
	if (!input.value) return false;
	const value = Number(input.value);
	return value >= min && value <= max;
};

const isValidDate = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return (
		date.getDate() === Number(day) &&
		date.getMonth() === Number(month) - 1 &&
		date.getFullYear() === Number(year)
	);
};

const handleInput = (input, errSpan, label, validateFn, errorMsg) => {
	if (!input.value) {
		showError(input, errSpan, label, "This field is required");
	} else if (!validateFn(input)) {
		showError(input, errSpan, label, errorMsg);
	} else {
		resetError(input, errSpan, label);
	}
};

// Input event listeners
dayInput.addEventListener("input", () =>
	handleInput(
		dayInput,
		dayErr,
		dayLabel,
		(input) => validateInput(input, 1, 31),
		"Must be a valid day"
	)
);

monthInput.addEventListener("input", () =>
	handleInput(
		monthInput,
		monthErr,
		monthLabel,
		(input) => validateInput(input, 1, 12),
		"Must be a valid month"
	)
);

yearInput.addEventListener("input", () =>
	handleInput(
		yearInput,
		yearErr,
		yearLabel,
		(input) => validateInput(input, 1900, new Date().getFullYear()),
		"Must be in the past"
	)
);

// Form submit handler
form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Remove any existing error states
	resetError(dayInput, dayErr, dayLabel);
	resetError(monthInput, monthErr, monthLabel);
	resetError(yearInput, yearErr, yearLabel);

	// Check all fields for emptiness first
	let hasErrors = false;

	if (!dayInput.value) {
		showError(dayInput, dayErr, dayLabel, "This field is required");
		hasErrors = true;
	} else if (!validateInput(dayInput, 1, 31)) {
		showError(dayInput, dayErr, dayLabel, "Must be a valid day");
		hasErrors = true;
	}

	if (!monthInput.value) {
		showError(monthInput, monthErr, monthLabel, "This field is required");
		hasErrors = true;
	} else if (!validateInput(monthInput, 1, 12)) {
		showError(monthInput, monthErr, monthLabel, "Must be a valid month");
		hasErrors = true;
	}

	if (!yearInput.value) {
		showError(yearInput, yearErr, yearLabel, "This field is required");
		hasErrors = true;
	} else if (!validateInput(yearInput, 1900, new Date().getFullYear())) {
		showError(yearInput, yearErr, yearLabel, "Must be in the past");
		hasErrors = true;
	}

	// If any errors exist, don't proceed with calculation
	if (hasErrors) return;

	// Check for valid date combination
	if (!isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
		showError(dayInput, dayErr, dayLabel, "Must be a valid date");
		return;
	}

	// Calculate and display age
	const { years, months, days } = ageCalculator(
		dayInput.value,
		monthInput.value,
		yearInput.value
	);

	yearResult.textContent = years;
	monthResult.textContent = months;
	dayResult.textContent = days;
});
