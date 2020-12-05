package com.froststudio3e.housemgmt.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class PassCode {

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;

}
