document.getElementById("lastModified").textContent = document.lastModified;

// HTML elements in the document
const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const condition = document.querySelector('#condition');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const apiKey = '1649af7731c6325d7ff2de9eb5eef6de';
const lat = '7.37';
const lon = '3.94';

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(weatherURL);
    if (response.ok) {
      const data = await response.json();

      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

// DISPLAY THE JSON DATA ONTO MY WEB PAGE
function displayResults(data) {

  currentTemp.innerHTML = `${data.main.temp}&deg; F`;
  condition.innerHTML = data.weather[0].description;
  high.innerHTML = `High: ${data.main.temp_max}&deg; F`;
  low.innerHTML = `Low: ${data.main.temp_min}&deg; F`;
  humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  sunrise.innerHTML = `Sunrise: ${formatTime(data.sys.sunrise)}`;
  sunset.innerHTML = `Sunset: ${formatTime(data.sys.sunset)}`;
  
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', data.weather[0].description);
  weatherIcon.setAttribute('width', '100');
  weatherIcon.setAttribute('height', '100');
}

apiFetch();
