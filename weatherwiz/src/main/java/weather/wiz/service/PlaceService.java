package weather.wiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weather.wiz.entity.Place;
import weather.wiz.repository.PlaceRepository;

@Service
public class PlaceService {
	@Autowired
	PlaceRepository placeRepo;
	
	public List<Place> getAllPlaces() {
		return placeRepo.findAll();
	}
	
	public Place getPlaceDetails(String placeName) {
		return placeRepo.findFirstByPlaceNameOrderByPlaceName(placeName);
	}
}
