const localWeather = 'https://api.openweathermap.org/data/2.5/weather?id=4930956&appid=cca47802e4b3602d4e7027edee1fca48';
const hourlyWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=42.3794659&lon=-71.2321047&appid=cca47802e4b3602d4e7027edee1fca48'
const localWeatherDiv = document.getElementById('local-weather');
const hourlyWeatherDiv = document.getElementById('national-weather');


function getLocalWeather(url) {
		fetch(url)
			.then(response => response.json())
			.then(weatherJSON => {
				generateCurrentWeatherHTML(weatherJSON.main);
			})
		.catch(console.error);
};

function getHourlyWeather(url) {
	fetch(url)
		.then(response => response.json())
		.then(hourlyWeatherJSON => {
		console.log(hourlyWeatherJSON.hourly);
		for(i = 0; i < hourlyWeatherJSON.hourly.length; i++){
			generateHourlyWeatherHTML(hourlyWeatherJSON.hourly[i])
			
		}
	})
}

function convertKToF(temp) {
	let f = ((temp - 273.15) * 1.8) + 32;
	return f.toFixed(0);
}

function generateCurrentWeatherHTML(jsonData) {
		const section = document.createElement('section');
		localWeatherDiv.appendChild(section);

	
		section.innerHTML =
			`
			<div class="current-weather">
			<div class="current-heading">
			<h3 id="current-temp">Current Temperature: ${convertKToF(jsonData.temp)} &deg F</h3>
			<div id="thermo"></div>
</div>
			<div class="current-div">
			<p>Feels Like: ${convertKToF(jsonData.feels_like)} &deg; F</p>
			<p>Pressure: ${jsonData.pressure} mb</p>
			<p>Humidity: ${jsonData.humidity}%</p>
			</div>
			</div>
			`;
	
	
		const thermo = document.getElementById('thermo');
		const thermostat = document.createElement('img');
	
		thermo.appendChild(thermostat);
	
		if((convertKToF(jsonData.temp)) < 32) {
			 thermostat.setAttribute('src', 'img/cold.svg');
		}else if ((convertKToF(jsonData.temp)) >= 32 && (convertKToF(jsonData.temp)) < 60) {
			thermostat.setAttribute('src', 'img/cool.svg');
		}else if ((convertKToF(jsonData.temp)) >= 60 && (convertKToF(jsonData.temp)) < 95) {
			thermostat.setAttribute('src', 'img/warm.svg');
		}else if ((convertKToF(jsonData.temp)) >= 95) {
			thermostat.setAttribute('src', 'img/hot.svg');
		};
	};



function generateHourlyWeatherHTML(data) {
		const section = document.createElement('section');
		hourlyWeatherDiv.appendChild(section);
		const unixTimeStamp = data.dt
		const milliseconds = unixTimeStamp * 1000;
		const dateObject = new Date(milliseconds);
		const dateFormat = dateObject.toTimeString();


		section.innerHTML =
			
			`<h3>${dateFormat}</h3>
			<div class="hourly-div">
			<p class="temperature">Temperature: ${convertKToF(data.temp)} &deg F</p>
			<p>Feels Like: ${convertKToF(data.feels_like)} &deg F</p>
			<p>Humidity: ${data.humidity}%</p>
			<p>UVI: ${data.uvi}</p>
			<p>Clouds: ${data.clouds}%</p>
			</div>
			`;

}






function init() {
	getLocalWeather(localWeather);
	getHourlyWeather(hourlyWeather)
};

init();
