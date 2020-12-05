package com.froststudio3e.housemgmt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Document(collection = "house")
@Data
@Builder
public class House {

	@Id
	private String id;
	private String name;
}
