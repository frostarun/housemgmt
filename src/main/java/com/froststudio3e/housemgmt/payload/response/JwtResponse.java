package com.froststudio3e.housemgmt.payload.response;

import java.util.List;

import com.froststudio3e.housemgmt.models.House;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private String id;
	private String username;
	private House house;
	private List<String> roles;

	public JwtResponse(String accessToken, String id, String username, House house, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.house = house;
		this.roles = roles;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public House getHouse() {
		return house;
	}

	public void setHouse(House house) {
		this.house = house;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
