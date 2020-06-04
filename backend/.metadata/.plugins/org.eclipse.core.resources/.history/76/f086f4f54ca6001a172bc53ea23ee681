package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import model.CourseFeedback;
import model.CourseFeedbackKey;

public interface CourseFeedbackRepository extends JpaRepository<CourseFeedback, CourseFeedbackKey> {
	
	@Query("select f from CourseFeedback f where course_id = ?1")
	List<CourseFeedback> findByCourseId(int courseId);
}
