package com.froststudio3e.housemgmt.models;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BillUnit {
	@NotBlank
	private String name;
	private String unit;
	@NotBlank
	private String amount;
}
