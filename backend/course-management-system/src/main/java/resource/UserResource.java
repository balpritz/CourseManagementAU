package resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import model.UserDetails;
import repository.UserRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserResource {
	
	@Autowired
	private UserRepository userRepo;
	
	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticateLogin(@RequestBody UserDetails user) {
		UserDetails dbUser = userRepo.findByEmail(user.getEmail());
		
		if(dbUser != null && (dbUser.getPassword()).contentEquals(user.getPassword())) {
			return ResponseEntity.noContent().build();
		}
		
		return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
	}
	
}
