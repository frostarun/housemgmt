package com.froststudio3e.housemgmt.models;

import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAnySetter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bill {

	private HashMap<String, String> bills;

	@JsonAnySetter
	void setBills(String key, String value) {
		bills.put(key, value);
	}

}
