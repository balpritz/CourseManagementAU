package model;

import javax.persistence.*;

@Entity
public class CourseFeedback {
	
	@EmbeddedId
	private CourseFeedbackKey id;
	
	@ManyToOne
	@MapsId("user_id")
	@JoinColumn(name = "user_id")
	UserDetails user;
	
	@ManyToOne
	@MapsId("course_id")
	@JoinColumn(name = "course_id")
	CourseDetails course;
 
    private String feedback;
	private int rating;
	private Boolean isEnrolled;
	private String feedbackDate;
	
	//----------------------GETTERS AND SETTERS-------------------------------
	public CourseFeedbackKey getId() {
		return id;
	}
	
	public void setId(CourseFeedbackKey id) {
		this.id = id;
	}
	
	public UserDetails getUser() {
		return user;
	}
	
	public void setUser(UserDetails user) {
		this.user = user;
	}
	
	public CourseDetails getCourse() {
		return course;
	}
	
	public void setCourse(CourseDetails course) {
		this.course = course;
	}
	
	public String getFeedback() {
		return feedback;
	}
	
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
	public int getRating() {
		return rating;
	}
	
	public void setRating(int rating) {
		this.rating = rating;
	}
	
	public Boolean getIsEnrolled() {
		return isEnrolled;
	}

	public void setIsEnrolled(Boolean isEnrolled) {
		this.isEnrolled = isEnrolled;
	}

	public String getFeedbackDate() {
		return feedbackDate;
	}

	public void setFeedbackDate(String feedbackDate) {
		this.feedbackDate = feedbackDate;
	}

	@Override
	public String toString() {
		return "CourseFeedback [id=" + id + ", user=" + user + ", course=" + course + ", feedback=" + feedback
				+ ", rating=" + rating + ", isEnrolled=" + isEnrolled + ", feedbackDate=" + feedbackDate + "]";
	}

	public CourseFeedback(CourseFeedbackKey id, UserDetails user, CourseDetails course, String feedback, int rating,
			Boolean isEnrolled, String feedbackDate) {
		super();
		this.id = id;
		this.user = user;
		this.course = course;
		this.feedback = feedback;
		this.rating = rating;
		this.isEnrolled = isEnrolled;
		this.feedbackDate = feedbackDate;
	}

	public CourseFeedback() {}
	
}
