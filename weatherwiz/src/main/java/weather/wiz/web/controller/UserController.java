package weather.wiz.web.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import weather.wiz.constant.WeatherWizConstant;

@Controller
public class UserController extends BaseController {
	private static final String VIEW_PREFIX = "user/home";

	@Override
	protected String getHeaderTitle() {
		return "WeatherWiz";
	}
	
	@RequestMapping("/")
	public String home() {
		return VIEW_PREFIX;
	}
	
	@RequestMapping("/login")
	public String login() {
		return "guest/login";
	}
	
	@RequestMapping("/signup")
	public String signup() {
		return "guest/userprofile";
	}
	
	@RequestMapping("/user")
	public String userProfile() {
		return "user/myaccount";
	}
	
	/**
	 * User home url
	 * @return User home url
	 */
	@RequestMapping("/home")
	public String userHome() {
		return VIEW_PREFIX;
	}
	
	/**
	 * User home url
	 * @return User home url
	 */
	@RequestMapping("/user/home")
	public String userRoomsHome() {
		return VIEW_PREFIX;
	}
	
	@RequestMapping("/user/savedcities")
	public String userSavedCities() {
		return "/user/savedcities";
	}
	
	@RequestMapping("/greatescapes")
	public String greatEscapes() {
		return "/user/greatescapes";
	}

	/**
	 * Redirect to logout.
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 */
	@RequestMapping("/logout")
	public String logOut(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		HttpSession session = request.getSession();
		session.removeAttribute(WeatherWizConstant.APPLICATION_USER.name());
		request.logout();
		return "redirect:/login";
	}
}