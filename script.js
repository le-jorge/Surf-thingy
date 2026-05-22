// Mock Data simulating an API response
const mockBeachData = {
    ocean_beach: { waves: 6.5, wind: 12, weather: "Sunny", crowd: "Medium" },
    pacifica: { waves: 3.0, wind: 5, weather: "Partly Cloudy", crowd: "High" },
    santa_cruz: { waves: 4.5, wind: 8, weather: "Sunny", crowd: "Low" },
    huntington: { waves: 1.5, wind: 18, weather: "Windy", crowd: "Medium" }
};

// DOM Elements
const beachSelect = document.getElementById('beach-select');
const conditionsPanel = document.getElementById('conditions-panel');
const suggestionPanel = document.getElementById('suggestion-panel');

const waveData = document.getElementById('wave-data');
const windData = document.getElementById('wind-data');
const weatherData = document.getElementById('weather-data');
const crowdData = document.getElementById('crowd-data');

const sportSuggestion = document.getElementById('sport-suggestion');
const suggestionReasoning = document.getElementById('suggestion-reasoning');

// Event Listener for Dropdown
beachSelect.addEventListener('change', (e) => {
    const selectedBeach = e.target.value;
    if (selectedBeach !== "none") {
        updateUI(mockBeachData[selectedBeach]);
    }
});

function updateUI(data) {
    // Reveal panels
    conditionsPanel.classList.remove('hidden');
    suggestionPanel.classList.remove('hidden');

    // Update conditions text
    waveData.textContent = `${data.waves} ft`;
    windData.textContent = `${data.wind} mph`;
    weatherData.textContent = data.weather;
    crowdData.textContent = data.crowd;

    // Calculate and display suggestion
    const recommendation = determineSport(data.waves, data.wind, data.crowd);
    sportSuggestion.textContent = recommendation.sport;
    suggestionReasoning.textContent = recommendation.reason;
}

// Core Logic Algorithm to pick a sport
function determineSport(waves, wind, crowd) {
    // High winds ruin water sports, good for running or kite surfing
    if (wind > 15) {
        return {
            sport: "🏃 Running or 🪁 Kite Surfing",
            reason: "It's super blown out and windy! Stay dry with a run, or grab a kite."
        };
    }

    // Big waves (over 4ft) = Surfing
    if (waves >= 4.0) {
        if (crowd === "High") {
            return {
                sport: "🏄 Surfing (Exercise Caution)",
                reason: "Great waves, but it's crowded out there. Respect the lineup!"
            };
        }
        return {
            sport: "🏄 Surfing",
            reason: "The swell is pumping. Grab your surfboard and get out there!"
        };
    }

    // Medium waves (2.5ft - 3.9ft) = Boogie boarding / Longboarding
    if (waves >= 2.5 && waves < 4.0) {
        return {
            sport: "🛹 Boogie Boarding or Longboarding",
            reason: "Fun, manageable waves today. Perfect for cruising on a longboard or boogie board."
        };
    }

    // Small waves (1ft - 2.4ft) = Skimboarding / Body Surfing
    if (waves >= 1.0 && waves < 2.5) {
        if (crowd === "Low") {
            return {
                sport: "🏄‍♂️ Skimboarding",
                reason: "Small waves and plenty of space on the sand make for perfect skimboarding conditions."
            };
        }
        return {
            sport: "🏊‍♂️ Body Surfing",
            reason: "Small, playful waves. Ditch the board and use your body!"
        };
    }

    // Flat waves (Under 1ft) = Beach games
    if (crowd === "High") {
        return {
            sport: "⚾ Play Catch or 🏖️ Relax",
            reason: "It's flat and crowded. Carve out a small spot to toss a ball or just chill."
        };
    }
    
    return {
        sport: "🏐 Beach Volleyball",
        reason: "The ocean is flat like a lake and you have space. Perfect time to set up a net!"
    };
}
