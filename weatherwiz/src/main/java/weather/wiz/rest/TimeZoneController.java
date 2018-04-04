package weather.wiz.rest;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class TimeZoneController {
	@RequestMapping(method = RequestMethod.GET, value = "/currentdatetime")
	public LocalDateTime getCurrentDateTime() {
		return LocalDateTime.now();
	}
}
