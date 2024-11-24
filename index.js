"use strict";

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");

const dayErr = document.querySelector("#dayErr");
const monthErr = document.querySelector("#monthErr");
const yearErr = document.querySelector("#yearErr");

const dayLabel = document.querySelector(".dayLabel");
const monthLabel = document.querySelector(".monthLabel");
const yearLabel = document.querySelector(".yearLabel");

const yearResult = document.querySelector(".year-result");
const monthResult = document.querySelector(".month-result");
const dayResult = document.querySelector(".day-result");

const calculateBtn = document.querySelector(".calculate-btn");

const ageCalculator = (day, month, year) => {
	const birthday = new Date(`${month}/${day}/${year}`);
	const now = new Date();

	let years = now.getFullYear() - birthday.getFullYear();
	let months = now.getMonth() - birthday.getMonth();
	let days = now.getDate() - birthday.getDate();

	// Adjust for negative months or days
	if (days < 0) {
		months--;
		// Get days in previous month
		const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += prevMonth.getDate();
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	return { years, months, days };
};

const resetError = (input, errSpan, label) => {
	errSpan.textContent = "";
	label.classList.remove("invalid-label");
	label.classList.add("valid-label");
	input.classList.remove("invalid");
	input.classList.add("valid");
};

const isValidDate = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return (
		date.getDate() === Number(day) &&
		date.getMonth() === Number(month) - 1 &&
		date.getFullYear() === Number(year)
	);
};

calculateBtn.addEventListener("click", () => {
	// Validate date before calculating
	if (!isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
		showError(dayInput, dayErr, dayLabel, "Invalid date");
		return;
	}

	const { years, months, days } = ageCalculator(
		dayInput.value,
		monthInput.value,
		yearInput.value
	);

	yearResult.textContent = years;
	monthResult.textContent = months;
	dayResult.textContent = days;
});

// Validate fields
const isEmpty = (input) => {
	return !input.value;
};

const showError = (input, errSpan, label, errMessage) => {
	errSpan.textContent = errMessage;
	label.classList.remove("valid-label");
	label.classList.add("invalid-label");
	input.classList.remove("valid");
	input.classList.add("invalid");
};

const isValidDay = (input) => {
	return !(
		Number(input.value) < Number(input.min) ||
		Number(input.value) > Number(input.max)
	);
};

const isValidMonth = (input) => {
	return !(
		Number(input.value) < Number(input.min) ||
		Number(input.value) > Number(input.max)
	);
};

const isValidYear = (input) => {
	return !(Number(input.value) > new Date().getFullYear());
};

dayInput.addEventListener("input", () => {
	if (isEmpty(dayInput)) {
		showError(dayInput, dayErr, dayLabel, "This field is required");
	} else if (!isValidDay(dayInput)) {
		showError(dayInput, dayErr, dayLabel, "Must be a valid day");
	} else {
		resetError(dayInput, dayErr, dayLabel);
	}
});

monthInput.addEventListener("input", () => {
	if (isEmpty(monthInput)) {
		showError(monthInput, monthErr, monthLabel, "This field is required");
	} else if (!isValidMonth(monthInput)) {
		showError(monthInput, monthErr, monthLabel, "Must be a valid month");
	} else {
		resetError(monthInput, monthErr, monthLabel);
	}
});

yearInput.addEventListener("input", () => {
	if (isEmpty(yearInput)) {
		showError(yearInput, yearErr, yearLabel, "This field is required");
	} else if (!isValidYear(yearInput)) {
		showError(yearInput, yearErr, yearLabel, "Must be in the past");
	} else {
		resetError(yearInput, yearErr, yearLabel);
	}
});
