package resource;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import model.CourseDetails;
import repository.CourseRepository;

@CrossOrigin(origins={"http://localhost:4200", "http://localhost:9876"})
@RestController
public class CourseResource {
	
	@Autowired
	private CourseRepository courseRepo;
	
	// to get the list of all courses
	@GetMapping("/get/courses")
	public List<CourseDetails> getAllCourseDetails() {
		return courseRepo.findAll();
	}
	
	// to retrieve the details of a particular course
	@GetMapping("/get/courses/{id}")
	public Optional<CourseDetails> getCourseDetails(@PathVariable int id) {
		return courseRepo.findById(id);
	}
	
	// to retrieve the details of courses based on search query
	@GetMapping("/search/courses")
	public List<CourseDetails> getCourseDetailsBySearchQuery(@RequestParam Optional<String> keyword) {
		return courseRepo.findByCourseDescription(keyword.orElse("_"));
	}
	
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
	
	// to delete a particular course
	@DeleteMapping("/delete/courses/{id}")
	public ResponseEntity<Void> deleteCourseById(@PathVariable int id) {
		Optional<CourseDetails> dbCourse = courseRepo.findById(id);
		
		if(dbCourse.isPresent()) {
			courseRepo.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	// to update the details of a course
	@PutMapping("/update/courses/{id}")
	public ResponseEntity<Void> updateCourseDetails(@RequestBody CourseDetails course, @PathVariable int id) {
		courseRepo.saveAndFlush(course);
		return ResponseEntity.noContent().build();
	}
	
}
