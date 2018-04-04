$(document)
		.ready(
				function() {
					$('#lnkSavedCities').addClass("current-menu-item");
					$('#lnkLogin').removeClass("current-menu-item");
					$('#lnkGreatEscapes').removeClass("current-menu-item");

					var tableRow = $('#trSavedCities');
					var htmlString = "<td style='padding:2px' width='16.6%' id='tdCity1'></td>" +
							"<td style='padding:2px' width='16.6%' id='tdCity2'></td>" +
							"<td style='padding:2px' width='16.6%' id='tdCity3'></td>" +
							"<td style='padding:2px' width='16.6%' id='tdCity4'></td>" +
							"<td style='padding:2px' width='16.6%' id='tdCity5'></td>" +
							"<td style='padding:2px' width='16.6%' id='tdCity6'></td>";
					var row = $(htmlString);
					tableRow.append(row);

					$.ajax({
						url : "/currentuser",
						type : "GET",
						contentType : "application/json; charset=utf-8",
						dataType : "json",
						success : function(result) {
							getSavedCities();
						},
						error : function(e) {
							setTimeout(function() {
								window.location.href = "/login";
							}, 500);
						},
					});
				});

function getSavedCities() {
	$.ajax({
		url : "/city",
		type : "GET",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(result) {
			populateCities(result);
		},
		error : function(e) {

		},
	});
}

function populateCities(result) {
	var currentCity = {
		"cityName" : "College Station",
		"lattitude": "30.615011",
		"longitude": "-96.342476"
	}
	populateCityData(currentCity, 1);
	for (var i = 0; i < result.length; i++) {
		populateCityData(result[i], i+2);
	}
	if (result.length < 5) {
		populateEmptyCellsForCities(result.length);
	}
}

function populateCityData(city, index) {
	var tableCell = $('#tdCity' + index);
	var htmlString = "";
	if(index == 1){
		htmlString = "<table class='table-responsive' style='border-radius: 1em;background-color: #1e202b' width='100%'><tr><td style='padding-top:10px'><h3 class='photo-title' align='center'>"
			+ city.cityName
			+ "</h3></td><td style='padding-top:10px' align='right'>&nbsp;</td></tr>";
	}
	else{
		htmlString = "<table class='table-responsive' style='border-radius: 1em;background-color: #1e202b' width='100%'><tr><td style='padding-top:10px'><h3 class='photo-title' align='center'>"
			+ city.cityName
			+ "</h3></td><td style='padding-top:10px' align='right'><img src='/img/delete.png' width='32px'></td></tr>";
	}
	
	var coordinates = city.lattitude + "," + city.longitude;
	$
			.ajax({
				url : "https://api.darksky.net/forecast/8033a3de715efec9a6789903a1466bf9/"
						+ coordinates,
				type : "GET",
				contentType : "application/json; charset=utf-8",
				dataType : "jsonp",
				success : function(result) {
					htmlString = htmlString
							+ "<tr><td colspan='2' style='padding-bottom: 10px' align='center'><h7 style='font-size:48px;font-weight:bold;' class='photo-title'>"
							+ result.currently.temperature.toFixed(0)
							+ "<sup>o</sup>F</h7></td></tr></table>";
					var cell = $(htmlString);
					tableCell.append(cell);
					var firstTableCell = $('#tdCity1');
					var addTableCell = $('#tdCity4');
					$(addTableCell).attr("height", $(firstTableCell).attr("height"));
				},
				error : function(e) {

				},
			});
}

function populateEmptyCellsForCities(noOfCities) {
	var cityNumber = noOfCities + 2;
	var tableCell = $('#tdCity' + cityNumber);
	var cell = $("<table class='table-responsive' style='border-radius: 1em;background-color: #1e202b' width='100%'>"
			+ "<tr><td style='padding-top:10px' align='center'><img onclick=openAddCityPopup() class='img-responsive' src='/img/plus.png' width='48px'></td></tr></table>");
	tableCell.append(cell);
	

	for (var i = 0; i < 5 - noOfCities - 1; i++) {
		var htmlString = " ";
		cell = $(htmlString);
		tableCell.append(cell);
	}
}

$('#btnModalCancel').click(function() {
	$('#weatherModal').modal('hide');
});

function openAddCityPopup(){
	$('#weatherModal').removeAttr('style');
	$('#weatherModal').modal('show');
	$(".modal .modal-title").html('Add To Favorite');
	//$("#actionBtnModalBody").html('');
	//$('#btnModalDelete').attr('value', imageId);
}