/**
 *
 * @copyright Copyright (c) 2019, Balint Erdosi (erdosib@gmail.com)
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/** global: OCA */
/** global: net */

(function () {

	/**
	 * @constructs Weather
	 */
	var Weather = function() {
	}

	Weather.prototype.divWeather = null;
	Weather.prototype.init = function() {
		this.getWeather();

	}

	Weather.prototype.getWeather = function() {
		var request = {
			widget: "weather",
			request: "getWeather"
		};

		net.requestWidget(request, this.updateWeather);
	}

	Weather.prototype.updateWeather = function(result) {
		var divWeather = document.querySelector("#widget-weather");
		var divInfo = divWeather.querySelector(".info");
		var temperatureRepresentationLookup = {
			"kelvin":  "°K",
			"imperial":"°F",
			"metric":  "°C"
		}
		if (result.value.error) {
			divInfo.classList.add("error");
			divInfo.innerHTML = "Failed to update: " + result.value.error;
			return;
		}
		try {
			divInfo.classList.remove("error");
			divInfo.innerHTML = "";
			divWeather.querySelector(".locationValue").innerHTML = result.value.location;
			divWeather.querySelector(".temperatureValue").innerHTML = result.value.temperature;
			divWeather.querySelector(".temperatureRepresentation").innerHTML = temperatureRepresentationLookup[result.value.metric]|| "ERROR";
			divWeather.querySelector(".weatherValue").innerHTML = result.value.weather;
			divWeather.querySelector(".humidityValue").innerHTML = result.value.humidity;
			divWeather.querySelector(".windValue").innerHTML = result.value.wind;
		} catch (e) {
			divInfo.classList.add("error");
			divInfo.innerHTML = "Failed to update some data.";
		}
	}

	OCA.DashBoard.Weather = Weather;
	OCA.DashBoard.weather = new Weather();
})()
