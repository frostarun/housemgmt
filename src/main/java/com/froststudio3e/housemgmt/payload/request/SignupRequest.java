package com.froststudio3e.housemgmt.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

public class SignupRequest {

	@NotBlank
	@Size(min = 3, max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	private String house;

	private Set<String> roles;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getHouse() {
		return house;
	}

	public void setHouse(String house) {
		this.house = house;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getRoles() {
		return this.roles;
	}

	public void setRole(Set<String> roles) {
		this.roles = roles;
	}
}
