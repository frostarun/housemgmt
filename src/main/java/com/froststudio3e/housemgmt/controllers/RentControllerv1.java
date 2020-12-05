package com.froststudio3e.housemgmt.controllers;

import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.froststudio3e.housemgmt.models.Bill;
import com.froststudio3e.housemgmt.models.House;
import com.froststudio3e.housemgmt.models.Rent;
import com.froststudio3e.housemgmt.payload.request.RentRequest;
import com.froststudio3e.housemgmt.repository.HouseRepository;
import com.froststudio3e.housemgmt.repository.RentRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/rent")
public class RentControllerv1 {

	@Autowired
	RentRepository rentRepo;

	@Autowired
	HouseRepository houseRepo;

	@GetMapping("/{houseId}/latest")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public Rent getLatest(@PathVariable String houseId) {
		return rentRepo.findByLatestIsTrueAndHouseName(houseId);
	}

	@GetMapping("/latest")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public RentRequest test1() {
		HashMap<String, String> hashMap = new HashMap<String, String>();
		hashMap.put("wifi", "500");
		return RentRequest.builder().bill(Bill.builder().basic("500").maintanence("400").water("100").other(hashMap).build()).build();
	}

	@GetMapping("/{houseId}/all")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<Rent> findAllByName(@PathVariable String houseId) {
		return rentRepo.findByHouseName(houseId);
	}

	@PostMapping()
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> addRent(@Valid @RequestBody RentRequest rentReq) {
		House house = houseRepo.findByName(rentReq.getHouseName()).orElseThrow(() -> new RuntimeException("Error: House is not found."));
		Rent rent = Rent.builder().latest(true).bill(rentReq.getBill()).house(house).date(rentReq.getDate()).build();
		Rent save = rentRepo.save(rent);
		return ResponseEntity.ok(save);
	}
}
