$(document).ready(function() {
	setHeaderFile();
	$('#lnkLogin').removeClass("current-menu-item");
	$('#lnkMyAccount').removeClass("current-menu-item");
	$('#lnkSavedCities').removeClass("current-menu-item");
	$('#lnkGreatEscapes').removeClass("current-menu-item");
	setTodayDateTime();
	var place = {
			"placeName": "College Station",
			"lattitude": "30.615011",
			"longitude": "-96.342476"
	}
	loadCurrentWeatherData(place);
	getAllPlaces();
});

function setTodayDateTime() {
	var d = new Date();
	var month = getMonthName(d.getMonth());
	$('#spanDate').html(d.getDate() + ' ' + month);
	var hour = d.getHours();
	var min = d.getMinutes();
	if (d.getHours() < 10) {
		hour = '0' + d.getHours();
	}
	if (d.getMinutes() < 10) {
		min = '0' + d.getMinutes();
	}
	$('#spanTime').html(hour + ':' + min);

	setDailyGraphDays(d);
}

function getMonthName(monthNumber) {
	var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
			"Sep", "Oct", "Nov", "Dec" ];
	return months[monthNumber - 1];
}

function getWeekDayName(weekDayNumber) {
	var days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
	return days[weekDayNumber - 1];
}

function loadCurrentWeatherData(place) {
	var coordinates = place.lattitude + "," + place.longitude;
	$("#btnFind").attr("title", place.placeName);
	$
			.ajax({
				url : "https://api.darksky.net/forecast/8033a3de715efec9a6789903a1466bf9/"
						+ coordinates,
				type : "GET",
				contentType : "application/json; charset=utf-8",
				dataType : "jsonp",
				success : function(result) {
					localStorage.setItem("weatherData", JSON.stringify(result));
					var searchedLocation = $('#btnFind').attr('title');
					if (searchedLocation != undefined && searchedLocation != '') {
						$('#spanLocation').html(searchedLocation);
						$("#btnFind").attr("title", '');
					} else {
						$('#spanLocation').html(result.timezone);
					}
					$('#spanTodayTemp').html(
							result.currently.temperature.toFixed(0) + '<sup>o</sup>F');
					setTodayForcastIcon(result.currently.icon);
					$('#spanDewPoint').html(
							'<img id="imgDewPoint" src="/img/icon-umberella.png" alt=""  />'
									+ result.currently.dewPoint + '%');
					$('#spanWindSpeed').html(
							'<img src="/img/icon-wind.png" alt="" >'
									+ result.currently.windSpeed + 'km/h');
					setWindDirection(result.currently.windBearing);
					setHourlyWeatherData(result.hourly.data);
					setDailyDataGraph(result);
				},
				error : function(e) {
					toastr
							.error(
									'Error while loading the data. Please refresh the screen.',
									'', {
										closeButton : true,
										progressBar : true,
										positionClass : "toast-top-center",
										timeOut : "2000",
									});
				},
			});
}

var map, infoWindow;
function getCurrentWeatherData() {
	var coordinates = '42.3601,-71.0589';
	$
			.ajax({
				url : "https://api.darksky.net/forecast/8033a3de715efec9a6789903a1466bf9/"
						+ coordinates,
				type : "GET",
				contentType : "application/json; charset=utf-8",
				dataType : "jsonp",
				success : function(result) {
					localStorage.setItem("weatherData", JSON.stringify(result));
					$('#spanLocation').html(result.timezone);
					$('#spanTodayTemp').html(
							result.currently.temperature + '<sup>o</sup>F');
					setTodayForcastIcon(result.currently.icon);
					$('#spanDewPoint').html(
							'<img id="imgDewPoint" src="/img/icon-umberella.png" alt="" class="img-responsive" />'
									+ result.currently.dewPoint + '%');
					$('#spanWindSpeed').html(
							'<img src="/img/icon-wind.png" alt="" class="img-responsive">'
									+ result.currently.windSpeed + 'km/h');
					setWindDirection(result.currently.windBearing);
					setHourlyWeatherData(result.hourly.data);
					setDailyDataGraph(result);
				},
				error : function(e) {
					toastr
							.error(
									'Error while loading the data. Please refresh the screen.',
									'', {
										closeButton : true,
										progressBar : true,
										positionClass : "toast-top-center",
										timeOut : "2000",
									});
				},
			});
}

function setTodayForcastIcon(icon) {
	if (icon == 'clear-day') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-2.svg");
	} else if (icon == 'clear-night') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-11.svg");
	} else if (icon == 'rain') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-10.svg");
	} else if (icon == 'snow') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-7.svg");
	} else if (icon == 'sleet') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-8.svg");
	} else if (icon == 'wind') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-1.svg");
	} else if (icon == 'fog') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-9.svg");
	} else if (icon == 'cloudy') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-6.svg");
	} else if (icon == 'partly-cloudy-day') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-5.svg");
	} else if (icon == 'partly-cloudy-night') {
		$("#imgTodayDayIcon").attr("src", "/img/icons/icon-14.svg");
	}
}

function setWindDirection(windBearing) {
	var rem = windBearing % 360;
	var index = Math.round(rem / 22.5) + 1;
	$('#spanWindDirection').html(
			'<img src="/img/icon-compass.png" alt="" />'
					+ getWindDirection(index));
}

function getWindDirection(direction) {
	var directions = [ "North", "North to North-East", "East",
			"East to North-East", "East", "East to South-East", "South-East",
			"South to South-East", "South", "South to South-West",
			"South-West", "West to South-West", "West", "West to North-West",
			"North-West", "North to North-West", "North" ];
	return directions[direction];
}

function setHourlyWeatherData(hourlyData) {
	for (var i = 1; i <= 6; i++) {
		var utcSeconds = hourlyData[i].time;
		var d = new Date(0);
		d.setUTCSeconds(utcSeconds);
		if (i == 1) {
			$('#spanTime1').html(getHourForDisplay(d.getHours()));
			$('#spanTemp1').html(hourlyData[i].temperature.toFixed(0) + '<sup>o</sup>F');
			setForcastIcon(hourlyData[i].icon, 'imgForcastIcon1');
		} else if (i == 2) {
			$('#spanTime2').html(getHourForDisplay(d.getHours()));
			$('#spanTemp2').html(hourlyData[i].temperature.toFixed(0) + '<sup>o</sup>F');
			setForcastIcon(hourlyData[i].icon, 'imgForcastIcon2');
		} else if (i == 3) {
			$('#spanTime3').html(getHourForDisplay(d.getHours()));
			$('#spanTemp3').html(hourlyData[i].temperature.toFixed(0) + '<sup>o</sup>F');
			setForcastIcon(hourlyData[i].icon, 'imgForcastIcon3');
		} else if (i == 4) {
			$('#spanTime4').html(getHourForDisplay(d.getHours()));
			$('#spanTemp4').html(hourlyData[i].temperature.toFixed(0) + '<sup>o</sup>F');
			setForcastIcon(hourlyData[i].icon, 'imgForcastIcon4');
		} else if (i == 5) {
			$('#spanTime5').html(getHourForDisplay(d.getHours()));
			$('#spanTemp5').html(hourlyData[i].temperature.toFixed(0) + '<sup>o</sup>F');
			setForcastIcon(hourlyData[i].icon, 'imgForcastIcon5');
		} else if (i == 6) {
			$('#spanTime6').html(getHourForDisplay(d.getHours()));
			$('#spanTemp6').html(hourlyData[i].temperature.toFixed(0) + '<sup>o</sup>F');
			setForcastIcon(hourlyData[i].icon, 'imgForcastIcon6');
		}
	}
}

function getHourForDisplay(hour) {
	if (hour == 1 || hour == 2 || hour == 3 || hour == 4 || hour == 5
			|| hour == 6 || hour == 7 || hour == 8 || hour == 9 || hour == 10
			|| hour == 11) {
		return hour + " AM";
	} else if (hour == 0) {
		return "12 AM";
	} else if (hour == 12) {
		return "12 PM";
	} else {
		var hr = hour - 12;
		return hr + " PM";
	}
}

function setForcastIcon(icon, id) {
	if (icon == 'clear-day') {
		$("#" + id).attr("src", "/img/icons/icon-2.svg");
	} else if (icon == 'clear-night') {
		$("#" + id).attr("src", "/img/icons/icon-11.svg");
	} else if (icon == 'rain') {
		$("#" + id).attr("src", "/img/icons/icon-10.svg");
	} else if (icon == 'snow') {
		$("#" + id).attr("src", "/img/icons/icon-7.svg");
	} else if (icon == 'sleet') {
		$("#" + id).attr("src", "/img/icons/icon-8.svg");
	} else if (icon == 'wind') {
		$("#" + id).attr("src", "/img/icons/icon-1.svg");
	} else if (icon == 'fog') {
		$("#" + id).attr("src", "/img/icons/icon-9.svg");
	} else if (icon == 'cloudy') {
		$("#" + id).attr("src", "/img/icons/icon-6.svg");
	} else if (icon == 'partly-cloudy-day') {
		$("#" + id).attr("src", "/img/icons/icon-5.svg");
	} else if (icon == 'partly-cloudy-night') {
		$("#" + id).attr("src", "/img/icons/icon-14.svg");
	}
}

function setDailyDataGraph(result) {
	var dailyData = result.daily.data;
	createGraphForDay(dailyData[0], 'tblTodayGraph');
	createGraphForDay(dailyData[1], 'tblDay1Graph');
	createGraphForDay(dailyData[2], 'tblDay2Graph');
	createGraphForDay(dailyData[3], 'tblDay3Graph');
	createGraphForDay(dailyData[4], 'tblDay4Graph');
	createGraphForDay(dailyData[5], 'tblDay5Graph');
	createGraphForDay(dailyData[6], 'tblDay6Graph');
	createGraphForDay(dailyData[7], 'tblDay7Graph');

	$("#spanExpandContractTodayGraph").attr("value", dailyData[0].time);
	$("#spanExpandContractDay1Graph").attr("value", dailyData[1].time);
	$("#spanExpandContractDay2Graph").attr("value", dailyData[2].time);
	$("#spanExpandContractDay3Graph").attr("value", dailyData[3].time);
	$("#spanExpandContractDay4Graph").attr("value", dailyData[4].time);
	$("#spanExpandContractDay5Graph").attr("value", dailyData[5].time);
	$("#spanExpandContractDay6Graph").attr("value", dailyData[6].time);
	$("#spanExpandContractDay7Graph").attr("value", dailyData[7].time);

	setForcastIcon(dailyData[0].icon, 'imgTodayForcastIcon');
	setForcastIcon(dailyData[1].icon, 'imgDay1ForcastIcon');
	setForcastIcon(dailyData[2].icon, 'imgDay2ForcastIcon');
	setForcastIcon(dailyData[3].icon, 'imgDay3ForcastIcon');
	setForcastIcon(dailyData[4].icon, 'imgDay4ForcastIcon');
	setForcastIcon(dailyData[5].icon, 'imgDay5ForcastIcon');
	setForcastIcon(dailyData[6].icon, 'imgDay6ForcastIcon');
	setForcastIcon(dailyData[7].icon, 'imgDay7ForcastIcon');
}

function createGraphForDay(data, tableId) {
	var table = $('#' + tableId);
	var tableHead = $('');
	table.html(tableHead);
	var htmlString = "<tr>";

	for (var i = 0; i < data.temperatureMin - 2; i++) {
		htmlString = htmlString + "<td width='1%'>&nbsp;</td>";
	}
	for (var i = data.temperatureMin - 2; i < data.temperatureMin - 1; i++) {
		htmlString = htmlString + "<td width='1%'>" + data.temperatureMin.toFixed(0)
				+ "<sup>o</sup>F</td>";
	}
	for (var i = data.temperatureMin - 1; i < data.temperatureMin; i++) {
		htmlString = htmlString + "<td width='1%'>&nbsp;</td>";
	}

	for (var i = data.temperatureMin; i < data.temperatureMax; i++) {
		htmlString = htmlString
				+ "<td width='1%' style='background-color: white'>&nbsp;</td>";
	}

	for (var i = data.temperatureMax; i < data.temperatureMax + 1; i++) {
		htmlString = htmlString + "<td width='1%'>&nbsp;</td>";
	}
	for (var i = data.temperatureMax + 1; i < data.temperatureMax + 2; i++) {
		htmlString = htmlString + "<td width='1%'>" + data.temperatureMax.toFixed(0)
				+ "<sup>o</sup>F</td>";
	}
	for (var i = data.temperatureMax + 2; i < 100; i++) {
		htmlString = htmlString + "<td width='1%'>&nbsp;</td>";
	}
	htmlString = htmlString + "</tr>";
	tableHead = $(htmlString);
	table.append(tableHead);
}

function setDailyGraphDays(today) {
	var nxtDay = 1;
	if (today.getDay() + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = today.getDay() + 1;
	}
	$('#spanDay1').html(getWeekDayName(nxtDay));

	if (nxtDay + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = nxtDay + 1;
	}
	$('#spanDay2').html(getWeekDayName(nxtDay));

	if (nxtDay + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = nxtDay + 1;
	}
	$('#spanDay3').html(getWeekDayName(nxtDay));

	if (nxtDay + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = nxtDay + 1;
	}
	$('#spanDay4').html(getWeekDayName(nxtDay));

	if (nxtDay + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = nxtDay + 1;
	}
	$('#spanDay5').html(getWeekDayName(nxtDay));

	if (nxtDay + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = nxtDay + 1;
	}
	$('#spanDay6').html(getWeekDayName(nxtDay));

	if (nxtDay + 1 > 7) {
		nxtDay = 1;
	} else {
		nxtDay = nxtDay + 1;
	}
	$('#spanDay7').html(getWeekDayName(nxtDay));
}

function expandDay(span, tdId) {
	if (span.innerHTML == '+') {
		$(span).html('-');
		var result = JSON.parse(localStorage.getItem("weatherData"));
		var time = $(span).attr('value');

		var dataOfDay;
		$.each(result.daily.data, function(i, v) {
			if (v.time == time) {
				dataOfDay = v;
				return;
			}
		});
		var tdForDay = $('#' + tdId);
		var htmlString = "<table style='background-color: rgb(30, 32, 43);border-radius: 1.25em' class='table-responsive' width = '100%'>"
				+ "<tr><td align='center' style='font-weight: bold;font-size: large;'>"
				+ dataOfDay.summary
				+ "</td></tr>"
				+ "<tr><td align='center'>"
				+ dataOfDay.temperatureMin.toFixed(0)
				+ "<sup>o</sup>F -> "
				+ dataOfDay.temperatureMax.toFixed(0)
				+ "<sup>o</sup>F </td></tr>"
				+ "</table>";
		var tableHead = $(htmlString);
		tdForDay.append(tableHead);
	} else {
		$(span).html('+');
		tdForDay = $('#' + tdId);
		htmlString = "";
		tableHead = $(htmlString);
		tdForDay.html(tableHead);
	}

}

function getDataOfDay(result, time) {
	$.each(result.daily.data, function(i, v) {
		if (v.time == time) {
			return v;
		}
	});
}