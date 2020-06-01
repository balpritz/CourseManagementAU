package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.CourseDetails;

public interface CourseRepository extends JpaRepository<CourseDetails, Integer> {
	public CourseDetails findByCourseTitle(String courseTitle);
}
