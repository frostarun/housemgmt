package com.froststudio3e.housemgmt.models;

import java.util.HashMap;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Bill {

	private String basic;
	private String water;
	private String maintanence;
	private HashMap<String, String> other;

}
