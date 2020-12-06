package com.froststudio3e.housemgmt.payload.request;

import com.froststudio3e.housemgmt.models.Bill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RentRequest {
	private String houseName;
	private Bill bill;
}
