package model;

import java.time.LocalDate;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class CourseDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int courseId;
	private String courseTitle;
	private String courseDescription;
	private String creatorId;
	private String skillsAcquired;
	private Boolean isCourseActive;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate courseCreationDate;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate lastUpdated;
	
	//----------------------GETTERS AND SETTERS-------------------------------
	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public String getCourseTitle() {
		return courseTitle;
	}

	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}

	public String getCourseDescription() {
		return courseDescription;
	}

	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}

	public String getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(String creatorId) {
		this.creatorId = creatorId;
	}

	public String getSkillsAcquired() {
		return skillsAcquired;
	}

	public void setSkillsAcquired(String skillsAcquired) {
		this.skillsAcquired = skillsAcquired;
	}

	public Boolean getIsCourseActive() {
		return isCourseActive;
	}

	public void setIsCourseActive(Boolean isCourseActive) {
		this.isCourseActive = isCourseActive;
	}

	public LocalDate getCourseCreationDate() {
		return courseCreationDate;
	}

	public void setCourseCreationDate(LocalDate courseCreationDate) {
		this.courseCreationDate = courseCreationDate;
	}

	public LocalDate getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(LocalDate lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	@Override
	public String toString() {
		return "CourseDetails [courseId=" + courseId + ", courseTitle=" + courseTitle + ", courseDescription="
				+ courseDescription + ", creatorId=" + creatorId + ", skillsAcquired=" + skillsAcquired
				+ ", isCourseActive=" + isCourseActive + ", courseCreationDate=" + courseCreationDate + ", lastUpdated="
				+ lastUpdated + "]";
	}

	public CourseDetails() {}
	
}
