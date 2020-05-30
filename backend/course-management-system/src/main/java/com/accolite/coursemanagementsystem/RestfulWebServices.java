package com.accolite.coursemanagementsystem;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class RestfulWebServices {
	
	@PostMapping("/authenticate")
	public ResponseEntity<Void> authenticateLogin(@RequestBody LoginDetails login) {
		System.out.println("works");
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/test")
	public String testget() {
		return "yes it works";
	}
	
}
