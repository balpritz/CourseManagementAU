package model;

import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class UserDetails {
	
	@Id 
	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	@Column(name = "userId")
	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String photoUrl;
	
	@OneToMany(mappedBy = "user")
	Set<CourseFeedback> feedbacks;
	
	//----------------------GETTERS AND SETTERS-------------------------------
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getPhotoUrl() {
		return photoUrl;
	}
	
	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	public UserDetails() {}

	@Override
	public String toString() {
		return "UserDetails [id=" + id + ", firstName=" + firstName + ", LastName=" + lastName + ", email=" + email
				+ ", password=" + password + ", photoUrl=" + photoUrl + "]";
	}

	public UserDetails(String id, String firstName, String lastName, String email, String password, String photoUrl) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.photoUrl = photoUrl;
	}
	
}
