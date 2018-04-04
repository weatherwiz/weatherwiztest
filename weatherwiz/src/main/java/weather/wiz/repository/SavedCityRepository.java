package weather.wiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import weather.wiz.entity.SavedCity;

public interface SavedCityRepository extends JpaRepository<SavedCity, Long> {
	@Query("from SavedCity c where c.cityId = :cityId")
	SavedCity findByCityId(@Param("cityId") Long cityId);
	
	@Query("from SavedCity c where c.userId = :userId")
	List<SavedCity> findByUserId(@Param("userId") Long userId);
}
