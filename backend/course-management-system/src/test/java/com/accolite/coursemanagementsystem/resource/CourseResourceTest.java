package com.accolite.coursemanagementsystem.resource;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import repository.CourseFeedbackRepository;
import repository.CourseRepository;
import repository.UserRepository;
import resource.CourseFeedbackResource;
import resource.CourseResource;
import resource.UserResource;

@RunWith(SpringRunner.class)
@WebMvcTest(value = {UserResource.class, CourseFeedbackResource.class, CourseResource.class}, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class CourseResourceTest {
	
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
	
	private List<CourseDetails> courseList;
	
	@BeforeEach
	void setup() {
		this.courseList = new ArrayList<>();
		this.courseList.add(new CourseDetails(1, "ABC", "alphaCaps", "INT403", "abc", null, false, null, null));
		this.courseList.add(new CourseDetails(2, "def", "alphaSmall", "INT406", "def", null, true, null, null));
	}
	
	@Test
	public void shouldFetchAllCourseDetails() throws Exception {
		when(courseRepo.findAll()).thenReturn(courseList);
		
		this.mockMvc.perform(get("/get/courses")).andExpect(status().isOk())
			.andExpect(jsonPath("$.size()", is(courseList.size())));
	}
	
	@Test
	public void shouldFetchCourseDetailsById() throws Exception {	
		when(courseRepo.findById(this.courseList.get(0).getCourseId())).thenReturn(Optional.of(this.courseList.get(0)));
		
		this.mockMvc.perform(get("/get/courses/{id}", this.courseList.get(0).getCourseId())).andExpect(status().isOk())
			.andExpect(jsonPath("$.courseTitle", is(this.courseList.get(0).getCourseTitle())));
	}
	
	@Test
	public void shouldReturnAllCoursesMatchingSearch() throws Exception {
		when(courseRepo.findByCourseDescription("pha")).thenReturn(courseList);
		
		this.mockMvc.perform(get("/search/courses").param("keyword", "pha"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.size()", is(courseList.size())));
	}
	
	@Test
	public void shouldCreateANewCourseIfNotAlreadyCreatedWithTheSameTitle() throws Exception {
		when(courseRepo.findByCourseTitle("ABC")).thenReturn(null);
		
		this.mockMvc.perform(post("/add-new-course").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.courseList.get(0))))
				.andExpect(status().isNoContent());
	}
	
	@Test
	public void shouldReturnNullDuringCreationIfSimilarCourseTitlePresent() throws Exception {
		when(courseRepo.findByCourseTitle("ABC")).thenReturn(this.courseList.get(0));
		
		this.mockMvc.perform(post("/add-new-course").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.courseList.get(0))))
				.andExpect(status().isBadRequest());
	}
	
	@Test
	public void shouldDeleteCourseIfPresent() throws Exception {
		when(courseRepo.findById(1)).thenReturn(Optional.of(this.courseList.get(0)));
		
		this.mockMvc.perform(delete("/delete/courses/{id}", 1))
			.andExpect(status().isNoContent());
	}
	
	@Test
	public void shouldReturnSuccessOnDeleteIfCourseNotPresent() throws Exception {
		when(courseRepo.findById(1)).thenReturn(Optional.empty());
		
		this.mockMvc.perform(delete("/delete/courses/{id}", 1))
			.andExpect(status().isNotFound());
	}
	
	@Test
	public void shouldReturnNoContentOnUpdate() throws Exception {
		this.mockMvc.perform(put("/update/courses/{id}", 1).contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.courseList.get(0))))
				.andExpect(status().isNoContent());
	}
	
}
