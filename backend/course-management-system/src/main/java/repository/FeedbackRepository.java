package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.CourseFeedback;

public interface FeedbackRepository extends JpaRepository<CourseFeedback, Integer> {

}
