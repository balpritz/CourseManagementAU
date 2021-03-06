package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import model.CourseDetails;

public interface CourseRepository extends JpaRepository<CourseDetails, Integer> {
	public CourseDetails findByCourseTitle(String courseTitle);
	
	@Query("select c from CourseDetails c where courseDescription like %?1%")
	List<CourseDetails> findByCourseDescription(String courseDescription);
}
