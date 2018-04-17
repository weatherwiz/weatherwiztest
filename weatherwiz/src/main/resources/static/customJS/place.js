function getAllPlaces() {
	$.ajax({
		url : "/allplaces",
		type : "GET",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(result) {
			localStorage.removeItem("allPlaces");
			localStorage.setItem("allPlaces", JSON.stringify(result));
		},
		error : function(e) {

		},
	});
}

function placeNameTyping(searchBox) {
	if (localStorage.getItem("allPlaces") == null) {
		getAllPlaces();
	}
	if (localStorage.getItem("allPlaces") != null) {
		var allPlaces = localStorage.getItem("allPlaces");
		var searchedPlaces = new Array();
		$.each($.parseJSON(allPlaces), function() {
			$.each(this, function(key, value) {
				if (key == 'placeName'
						&& value.toLowerCase().indexOf($(searchBox).val().toLowerCase()) != -1) {
					searchedPlaces.push(value);
				}
			});
		});
		$(searchBox).autocomplete({
			source : searchedPlaces,
			minLength: 3
		});
	}
}

$('#txtLocationToBeSearched').on('autocompleteselect', function (e, ui) {
    $("#btnFind").attr("title", ui.item.value);
});

var map, infoWindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : -34.397,
			lng : 150.644
		},
		zoom : 6
	});
	infoWindow = new google.maps.InfoWindow;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};
			return pos.lat + "," + pos.lng;
		}, function() {

		});
	} else {
		return "No Support"; // "Browser doesn't support Geolocation";
	}
}

$('#btnFind').click(function(){
	if($('#txtLocationToBeSearched').val() == ''){
		toastr
		.error(
				'Please enter the location',
				'', {
					closeButton : true,
					progressBar : true,
					positionClass : "toast-top-center",
					timeOut : "2000",
				});
		return;
	}
	var place = $('#btnFind').attr('title');
	$.ajax({
		url : "/place",
		type : "POST",
		data : place,
		contentType : "application/json; charset=utf-8",
		success : function(result) {
			loadCurrentWeatherData(result);
		},
		error : function(e) {
			toastr
			.error(
					'Location is not found',
					'', {
						closeButton : true,
						progressBar : true,
						positionClass : "toast-top-center",
						timeOut : "2000",
					});
			$('#txtLocationToBeSearched').val('');
		},
	});
});