package resource;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import model.CourseDetails;
import model.CourseFeedback;
import model.CourseFeedbackKey;
import model.UserDetails;

import org.springframework.web.bind.annotation.*;

import repository.CourseFeedbackRepository;
import repository.CourseRepository;
import repository.UserRepository;

@CrossOrigin(origins={"http://localhost:4200", "http://localhost:9876"})
@RestController
public class CourseFeedbackResource {
	
	@Autowired
	private CourseFeedbackRepository feedbackRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CourseRepository courseRepo;
	
	// get enrollment data for a particular course
	@GetMapping("/get/enrollment-data/courses/{courseId}")
	public List<CourseFeedback> getEnrollmentDataByCourseId(@PathVariable int courseId) {
		return feedbackRepo.findByCourseId(courseId);
	}
	
	// get user enrollment data
	@GetMapping("/get/enrollment-data/users/{userId}")
	public List<CourseFeedback> getEnrollmentDataByUserId(@PathVariable String userId) {
		return feedbackRepo.findByUserId(userId);
	}
	
	// get enrollment status for a user
	@PostMapping("/get/enrollment-status")
	public Boolean getEnrollmentStatus(@RequestBody CourseFeedbackKey key) {
		Optional<CourseFeedback> dbFeedback = feedbackRepo.findById(key);
		
		if(dbFeedback.isPresent()) {
			return true;
		}
		
		return false;
	}
	
	// enroll a user to a course
	@PutMapping("/enroll/user")
	public ResponseEntity<Void> enrollUserToACourse(@RequestBody CourseFeedbackKey key) {
		Optional<UserDetails> dbUser = userRepo.findById(key.getUserId());
		Optional<CourseDetails> dbCourse = courseRepo.findById(key.getCourseId());
		
		CourseFeedback newEntry = new CourseFeedback(key, dbUser.get(), dbCourse.get(), null, 0, true, null);
		
		feedbackRepo.saveAndFlush(newEntry);

		return ResponseEntity.noContent().build();
	}
	
	// add course feedback from a user
	@PutMapping("/add/feedback")
	public ResponseEntity<Void> addFeedback(@RequestParam String data, @RequestParam int rating, @RequestBody CourseFeedbackKey key) {
		Optional<UserDetails> dbUser = userRepo.findById(key.getUserId());
		Optional<CourseDetails> dbCourse = courseRepo.findById(key.getCourseId());
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd@HH:mm:ss");  
		LocalDateTime now = LocalDateTime.now(); 
		
		CourseFeedback newEntry = new CourseFeedback(key, dbUser.get(), dbCourse.get(), data, rating, true, dtf.format(now));
		
		feedbackRepo.saveAndFlush(newEntry);
		return ResponseEntity.noContent().build();
	}
	
}
