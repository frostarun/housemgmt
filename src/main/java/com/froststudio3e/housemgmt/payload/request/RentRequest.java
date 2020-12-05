package com.froststudio3e.housemgmt.payload.request;

import java.time.ZonedDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import com.froststudio3e.housemgmt.models.Bill;

import lombok.Builder;
import lombok.Data;

@Document(collection = "rent")
@Data
@Builder
public class RentRequest {

	private String houseName;
	private ZonedDateTime date;
	private Bill bill;
	private Boolean latest;

}
