package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@SuppressWarnings("serial")
@Embeddable
public class CourseFeedbackKey implements Serializable {
	
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "course_id")
	private int courseId;

	//----------------------GETTERS AND SETTERS-------------------------------
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + courseId;
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CourseFeedbackKey other = (CourseFeedbackKey) obj;
		if (courseId != other.courseId)
			return false;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		return true;
	}

	public CourseFeedbackKey() {}

	public CourseFeedbackKey(String userId, int courseId) {
		this.userId = userId;
		this.courseId = courseId;
	}
	
}
