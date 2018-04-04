package weather.wiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import weather.wiz.entity.Place;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>{
	@Query("from Place p where p.placeId = :placeId")
    Place findByPlaceId(@Param("placeId") Long placeId);
	
	@Query("from Place p where UPPER(p.placeName) LIKE CONCAT('%',UPPER(:placeName),'%')")
    List<Place> findByPlaceName(@Param("placeName") String placeName);
	
	Place findFirstByPlaceNameOrderByPlaceName(@Param("placeName") String placeName);
}
