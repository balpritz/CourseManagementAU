package resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import model.UserDetails;
import repository.UserRepository;

@CrossOrigin(origins= {"http://localhost:4200", "http://localhost:9876"})
@RestController
public class UserResource {
	
	@Autowired
	private UserRepository userRepo;
	
	// to get the entire user data
	@GetMapping("/get/users")
	public List<UserDetails> getAllUserDetails() {
		return userRepo.findAll();
	}
	
	// to retrieve a particular user's data
	@GetMapping("/get/users/{id}")
	public Optional<UserDetails> getUserDetails(@PathVariable String id) {
		return userRepo.findById(id);
	}
	
	// to authenticate normal login
	@PostMapping("/authenticate")
	public UserDetails authenticateLogin(@RequestBody UserDetails user) {
		UserDetails dbUser = userRepo.findByEmail(user.getEmail());
		
		if(dbUser != null && (dbUser.getPassword()).contentEquals(user.getPassword())) {
			return dbUser;
		}
		
		return null;
	}
	
	// to authenticate google sign-in
	@PostMapping("/authenticate-google-user")
	public UserDetails authenticateGoogleUser(@RequestBody UserDetails user) {
		UserDetails dbUser = userRepo.findByEmail(user.getEmail());
		
		if(dbUser != null) {
			return dbUser;
		} else {
			userRepo.saveAndFlush(user);
			return userRepo.findByEmail(user.getEmail());
		}
	}
	
}
