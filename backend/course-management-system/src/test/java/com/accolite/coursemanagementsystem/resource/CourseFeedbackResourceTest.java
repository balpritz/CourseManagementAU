package com.accolite.coursemanagementsystem.resource;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.CourseDetails;
import model.CourseFeedback;
import model.CourseFeedbackKey;
import model.UserDetails;
import repository.CourseFeedbackRepository;
import repository.CourseRepository;
import repository.UserRepository;
import resource.CourseFeedbackResource;
import resource.CourseResource;
import resource.UserResource;

@RunWith(SpringRunner.class)
@WebMvcTest(value = {UserResource.class, CourseFeedbackResource.class, CourseResource.class}, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class CourseFeedbackResourceTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private CourseRepository courseRepo;
	
	@MockBean
	private UserRepository userRepo;
	
	@MockBean
	private CourseFeedbackRepository feedbackRepo;
	
	private List<CourseFeedback> feedbackList;
	
	@BeforeEach
	void setup() {
		this.feedbackList = new ArrayList<>();
		this.feedbackList.add(new CourseFeedback(new CourseFeedbackKey("INT403", 1), 
				new UserDetails("INT403", "Balpreet", "Singh", "abc@gmail.com", "abc", null), 
				new CourseDetails(1, "ABC", "alphaCaps", "INT403", "abc", null, false, null, null),
				"great", 5, true, null));
		
		this.feedbackList.add(new CourseFeedback(new CourseFeedbackKey("INT406", 1), 
				new UserDetails("INT406", "Pawan", "Kumar", "def@gmail.com", "def", null), 
				new CourseDetails(1, "ABC", "alphaCaps", "INT403", "abc", null, false, null, null),
				"good", 4, true, null));
	}
	
	@Test
	public void shouldFetchEnrollmentDataForACourse() throws Exception {
		when(feedbackRepo.findByCourseId(1)).thenReturn(feedbackList);
		
		this.mockMvc.perform(get("/get/enrollment-data/courses/{courseId}", 1))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.size()", is(feedbackList.size())));
	}
	
	@Test
	public void shouldFetchEnrollmentDataForAUser() throws Exception {
		when(feedbackRepo.findByUserId("INT403")).thenReturn(feedbackList);
		
		this.mockMvc.perform(get("/get/enrollment-data/users/{userId}", "INT403"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.size()", is(feedbackList.size())));
	}
	
	@SuppressWarnings("unchecked")
	@Test
	public void shouldFetchErollmentStatusForAUser() throws Exception {
		when(feedbackRepo.findById(this.feedbackList.get(0).getId())).thenReturn(Optional.of(this.feedbackList.get(0)), Optional.empty());
		
		this.mockMvc.perform(post("/get/enrollment-status").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.feedbackList.get(0).getId())))
				.andExpect(status().isOk())
				.andExpect(content().string("true"));
		
		this.mockMvc.perform(post("/get/enrollment-status").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.feedbackList.get(0).getId())))
				.andExpect(status().isOk())
				.andExpect(content().string("false"));
	}
	
	@Test
	public void shouldEnrollAUserToACourse() throws Exception {
		when(userRepo.findById("INT403")).thenReturn(Optional.of(this.feedbackList.get(0).getUser()));
		when(courseRepo.findById(1)).thenReturn(Optional.of(this.feedbackList.get(0).getCourse()));
		
		this.mockMvc.perform(put("/enroll/user").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.feedbackList.get(0).getId())))
				.andExpect(status().isNoContent());
	}
	
	@Test
	public void shouldAddFeedbackFromAUser() throws Exception {
		when(userRepo.findById("INT403")).thenReturn(Optional.of(this.feedbackList.get(0).getUser()));
		when(courseRepo.findById(1)).thenReturn(Optional.of(this.feedbackList.get(0).getCourse()));
		
		this.mockMvc.perform(put("/add/feedback?data=good&rating=5").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.feedbackList.get(0).getId())))
				.andExpect(status().isNoContent());
	}
	
}
