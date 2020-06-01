package resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import model.CourseDetails;
import repository.CourseRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class CourseResource {
	
	@Autowired
	private CourseRepository courseRepo;
	
	// to add a new course
	@PostMapping("/add-new-course")
	public ResponseEntity<String> addNewCourse(@RequestBody CourseDetails newCourse) {
		
		CourseDetails dbCourse = courseRepo.findByCourseTitle(newCourse.getCourseTitle());
		
		if(dbCourse != null) {
			return new ResponseEntity<String>("Course with the same title exists", HttpStatus.BAD_REQUEST);
		}
		
		courseRepo.saveAndFlush(newCourse);
		return ResponseEntity.noContent().build();
	}
}
