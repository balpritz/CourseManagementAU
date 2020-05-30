package com.accolite.coursemanagementsystem;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class RestfulWebServices {
	
	@PostMapping("/authenticate")
	public ResponseEntity<Void> authenticateLogin(@RequestBody LoginDetails login) {
		return ResponseEntity.noContent().build();
	}
}
