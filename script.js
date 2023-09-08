const searchButton = document.getElementById('search');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const weatherInfo = document.getElementById('weather-info');
const windInfo = document.getElementById('wind-info');
const precipitationInfo = document.getElementById('precipitation-info');
const temperatureInfo = document.getElementById('temperature-info');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
        fetchWeather1(city);
    }
});
function fetchWeather(city) {
    const apiUrl = `https://wttr.in/${city}?format=%C+%t`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            // Use regular expressions to match condition and temperature
            const matches = data.match(/^(.*?)\s+([-+]?\d+(\.\d+)?)/);

            if (matches && matches.length >= 3) {
                const condition = matches[1];
                const temperature = matches[2];
                cityName.textContent = city;
                weatherInfo.textContent = `Condition: ${condition} `;
                temperatureInfo.textContent = `Temperature: ${temperature}°C`;
            } else {
                cityName.textContent = 'Invalid Data';
                weatherInfo.textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function fetchWeather1(city) {
    const apiUrl = `https://wttr.in/${city}?format=%w+%m`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            const [wind, precipitation] = data.split(' ');
            windInfo.textContent = `Wind: ${wind}`;
            precipitationInfo.textContent=`Precipitation: ${precipitation}`;
        })
            .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
