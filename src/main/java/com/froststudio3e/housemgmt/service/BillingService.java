package com.froststudio3e.housemgmt.service;

import java.util.List;

import com.froststudio3e.housemgmt.models.BillUnit;

public class BillingService {

	private BillingService() {
		throw new IllegalStateException("Utility class");
	}

	public static String calculateTotal(List<BillUnit> billunits) {
		int total = 0;
		for (BillUnit billUnit : billunits) {
			total = total + Integer.parseInt(billUnit.getAmount());
		}
		return String.valueOf(total);
	}
}
