package model;

import javax.persistence.*;

@Entity
public class CourseFeedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int feedbackId;
	private String feedback;
	private String courseId;
	private String feedbackProviderId;
	
	//----------------------GETTERS AND SETTERS-------------------------------
	public int getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(int feedbackId) {
		this.feedbackId = feedbackId;
	}
	
	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}
	
	public String getCourseId() {
		return courseId;
	}
	
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	
	public String getFeedbackProviderId() {
		return feedbackProviderId;
	}
	
	public void setFeedbackProviderId(String feedbackProviderId) {
		this.feedbackProviderId = feedbackProviderId;
	}
	
	@Override
	public String toString() {
		return "CourseFeedback [feedbackId=" + feedbackId + ", feedback=" + feedback + ", courseId=" + courseId
				+ ", feedbackProviderId=" + feedbackProviderId + "]";
	}
	
	public CourseFeedback() {}
	
}
