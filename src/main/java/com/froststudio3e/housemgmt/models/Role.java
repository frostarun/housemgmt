package com.froststudio3e.housemgmt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "roles")
@Data
public class Role {

	@Id
	private String id;
	
	@Indexed(unique = true)
	private ERole name;

	public Role() {
	}

	public Role(ERole name) {
		this.name = name;
	}
}
