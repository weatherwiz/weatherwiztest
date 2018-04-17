package weather.wiz.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import weather.wiz.constant.WeatherWizConstant;
import weather.wiz.entity.ApplicationUser;
import weather.wiz.entity.SavedCity;
import weather.wiz.repository.SavedCityRepository;

@Service
public class SavedCityService {
	@Autowired
	private SavedCityRepository repository;
	
	public SavedCity saveCity(SavedCity city, HttpServletRequest req) {
		HttpSession session = req.getSession();
		ApplicationUser currentUser = null;
		if (session.getAttribute(WeatherWizConstant.APPLICATION_USER.name()) != null) {
			currentUser = (ApplicationUser) session.getAttribute(WeatherWizConstant.APPLICATION_USER.name());
			city.setUserId(currentUser.getUserId());
			repository.save(city);
			return city;
		}
		return null;
	}
	
	public List<SavedCity> getSavedCities(HttpServletRequest req){
		HttpSession session = req.getSession();
		ApplicationUser currentUser = null;
		if (session.getAttribute(WeatherWizConstant.APPLICATION_USER.name()) != null) {
			currentUser = (ApplicationUser) session.getAttribute(WeatherWizConstant.APPLICATION_USER.name());
			return repository.findByUserId(currentUser.getUserId());
		}
		return null;
	}
}
