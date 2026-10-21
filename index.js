const errorMessage = document.getElementById("error-message");
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");

function displayError(message) {
errorMessage.textContent = message;
errorMessage.classList.remove("hidden");
}

function clearError() {
errorMessage.textContent = "";
errorMessage.classList.add("hidden");
}

function fetchWeatherAlerts(state) {
fetch(`${weatherApi}${state}`)
.then(response => {
if (!response.ok) {
throw new Error(`HTTP error: ${response.status}`);
}


        return response.json();
    })
    .then(data => {
        clearError();
        displayAlerts(data);
    })
    .catch(errorObject => {
        displayError(errorObject.message);
    });


}

function displayAlerts(data) {
const title = data.title;
const numberOfAlerts = data.features.length;


let html = `<h2>${title}: ${numberOfAlerts}</h2>`;

data.features.forEach(alert => {
    html += `<p>${alert.properties.headline || "Headline unavailable"}</p>`;
});

alertsDisplay.innerHTML = html;


}

const validStates = [
"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL",
"GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
"ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE",
"NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
"OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
"VA", "WA", "WV", "WI", "WY"
];

fetchButton.addEventListener("click", () => {
const state = stateInput.value.trim().toUpperCase();


if (state === "") {
    displayError("Please enter a state abbreviation.");
    return;
}

 



clearError();
stateInput.value = "";
alertsDisplay.innerHTML = "";

fetchWeatherAlerts(state);


});
