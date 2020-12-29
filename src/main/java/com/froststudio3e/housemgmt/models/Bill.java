package com.froststudio3e.housemgmt.models;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bill {

	private String total;
	private ArrayList<BillUnit> bills;

}
