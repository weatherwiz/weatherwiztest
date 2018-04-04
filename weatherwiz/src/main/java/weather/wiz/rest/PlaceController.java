package weather.wiz.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import weather.wiz.entity.Place;
import weather.wiz.service.PlaceService;

@RestController
@RequestMapping(value = "/")
public class PlaceController {
	@Autowired
	PlaceService service;
	
	@RequestMapping(method = RequestMethod.GET, value = "/allplaces")
	public List<Place> getAllPlaces() {
		return service.getAllPlaces();
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/place")
	public Place getPlaceDetails(@RequestBody String placeName) {
		Place p = service.getPlaceDetails(placeName);
		return p;
	}
}
