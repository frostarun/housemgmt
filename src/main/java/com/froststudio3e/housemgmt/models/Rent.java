package com.froststudio3e.housemgmt.models;

import java.time.ZonedDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Document(collection = "rent")
@Data
@Builder
public class Rent {

	@Id
	private String id;
	@DBRef
	private House house;
	private ZonedDateTime date;
	private Bill bill;
	private Boolean latest;

}
