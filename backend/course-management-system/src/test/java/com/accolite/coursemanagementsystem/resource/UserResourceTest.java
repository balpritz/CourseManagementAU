package com.accolite.coursemanagementsystem.resource;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

import model.UserDetails;
import repository.CourseFeedbackRepository;
import repository.CourseRepository;
import repository.UserRepository;
import resource.CourseFeedbackResource;
import resource.CourseResource;
import resource.UserResource;

@RunWith(SpringRunner.class)
@WebMvcTest(value = {UserResource.class, CourseFeedbackResource.class, CourseResource.class}, excludeAutoConfiguration = SecurityAutoConfiguration.class)
public class UserResourceTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private UserRepository userRepo;
	
	@MockBean
	private CourseFeedbackRepository feedbackRepo;
	
	@MockBean
	private CourseRepository courseRepo;
	
	private List<UserDetails> userList;
	
	@BeforeEach
	void setup() {
		this.userList = new ArrayList<>();
		this.userList.add(new UserDetails("INT403", "Balpreet", "Singh", "abc@gmail.com", "abc", null));
		this.userList.add(new UserDetails("INT406", "Pawan", "Kumar", "def@gmail.com", "def", null));
	}
	
	@Test
	public void shouldFetchAllUsersDetails() throws Exception {
		when(userRepo.findAll()).thenReturn(userList);
		
		this.mockMvc.perform(get("/get/users")).andExpect(status().isOk())
			.andExpect(jsonPath("$.size()", is(userList.size())));
	}
	
	@Test
	public void shouldFetchUserDetailsById() throws Exception {	
		when(userRepo.findById(this.userList.get(0).getId())).thenReturn(Optional.of(this.userList.get(0)));
		
		this.mockMvc.perform(get("/get/users/{id}", this.userList.get(0).getId())).andExpect(status().isOk())
			.andExpect(jsonPath("$.firstName", is(this.userList.get(0).getFirstName())));
	}
	
	@Test
	public void shouldReturnNullIfNotRegistered() throws Exception {
		when(userRepo.findByEmail(this.userList.get(0).getEmail())).thenReturn(null);
		
		this.mockMvc.perform(post("/authenticate").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.userList.get(0))))
				.andExpect(status().isOk()).andExpect(jsonPath("$").doesNotExist());
	}
	
	@Test
	public void shouldReturnNullOnBadLoginCredentials() throws Exception {
		when(userRepo.findByEmail(this.userList.get(0).getEmail())).thenReturn(this.userList.get(0));
		
		this.mockMvc.perform(post("/authenticate").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.userList.get(1))))
				.andExpect(status().isOk()).andExpect(jsonPath("$").doesNotExist());
	}
	
	@Test
	public void shouldReturnUserDetailsOnValidLoginCredentials() throws Exception {
		when(userRepo.findByEmail(this.userList.get(0).getEmail())).thenReturn(this.userList.get(0));
		
		this.mockMvc.perform(post("/authenticate").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.userList.get(0))))
				.andExpect(status().isOk()).andExpect(jsonPath("$.id", is(this.userList.get(0).getId())));
	}
	
	@Test
	public void shouldRegisterGoogleUser() throws Exception {
		when(userRepo.findByEmail(this.userList.get(0).getEmail())).thenReturn(null, this.userList.get(0));
		
		this.mockMvc.perform(post("/authenticate-google-user").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.userList.get(0))))
				.andExpect(status().isOk()).andExpect(jsonPath("$.id", is(this.userList.get(0).getId())));
	}
	
	@Test
	public void shouldReturnAlreadyRegisteredGoogleUser() throws Exception {
		when(userRepo.findByEmail(this.userList.get(0).getEmail())).thenReturn(this.userList.get(0));
		
		this.mockMvc.perform(post("/authenticate-google-user").contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.userList.get(0))))
				.andExpect(status().isOk()).andExpect(jsonPath("$.id", is(this.userList.get(0).getId())));
	}
	
}
