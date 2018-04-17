package weather.wiz.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import weather.wiz.entity.SavedCity;
import weather.wiz.service.SavedCityService;

@RestController
@RequestMapping(value = "/")
public class SavedCityController {
	@Autowired
	SavedCityService service;
	
	@RequestMapping(method = RequestMethod.POST, value = "/city/save")
	public SavedCity saveCity(@RequestBody SavedCity city, HttpServletRequest req) {
		return service.saveCity(city, req);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/city")
	public List<SavedCity> getSavedCities(HttpServletRequest req) {
		return service.getSavedCities(req);
	}
}
