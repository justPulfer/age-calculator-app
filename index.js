"use strict";

// Users should be able to:

// - View an age in years, months, and days after submitting a valid date through the form
// - Receive validation errors if:
//   - Any field is empty when the form is submitted
//   - The day number is not between 1-31
//   - The month number is not between 1-12
//   - The year is in the future
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page
// - **Bonus**: See the age numbers animate to their final number when the form is submitted

// Selecting DOM elements
// Input elements
const dayInput = document.querySelector(".day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const form = document.querySelector("#age-form");

// Output elements
const years = document.querySelector(".years-text");
const months = document.querySelector(".months-text");
const days = document.querySelector(".days-text");

// submit btn
const arrowBtn = document.querySelector(".arrow-icon");

//other elements
const computedValue = document.querySelector(".computed-value");

let numYears;
let numMonths;
let numDays;

const displayAge = function () {
	years.textContent = numYears;
	months.textContent = numMonths;
	days.textContent = numDays;
};

const clearInputFields = function () {
	// clear input fields
	dayInput.value = "";
	monthInput.value = "";
	yearInput.value = "";
};

const ageCalculator = function (day, month, year) {
	const birthday = new Date(
		`${monthInput.value}/${dayInput.value}/${yearInput.value}`
	);

	const now = new Date();

	// difference in dates to result in timestamp
	const ageTimestamp = now - birthday;
	console.log(ageTimestamp);
	// we put the timestamp into the new Date method
	const ageInDateFormat = new Date(ageTimestamp);
	console.log(ageInDateFormat);

	// we get the num of days, months and years
	numYears = ageInDateFormat.getFullYear() - 1970;
	numMonths = ageInDateFormat.getMonth();
	numDays = ageInDateFormat.getDate() - 1;

	// display to the UI
	displayAge(numYears, numMonths, numDays);
	clearInputFields();
};

// event listeners
arrowBtn.addEventListener("click", function (e) {
	e.preventDefault();

	ageCalculator(dayInput, monthInput, yearInput);
});
