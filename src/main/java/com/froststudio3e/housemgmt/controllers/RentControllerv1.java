package com.froststudio3e.housemgmt.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.froststudio3e.housemgmt.models.House;
import com.froststudio3e.housemgmt.models.Rent;
import com.froststudio3e.housemgmt.payload.request.RentRequest;
import com.froststudio3e.housemgmt.payload.response.MessageResponse;
import com.froststudio3e.housemgmt.repository.HouseRepository;
import com.froststudio3e.housemgmt.repository.RentRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/rent")
public class RentControllerv1 {

	private static final String HOUSE_NOT_FOUND = "House not found!";
	private static final String RENT_NOT_FOUND = "Rents not found!";

	@Autowired
	RentRepository rentRepo;

	@Autowired
	HouseRepository houseRepo;

	@GetMapping("/{housename}/latest")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> getLatest(@PathVariable String housename) {
		Optional<House> house = houseRepo.findByName(housename);
		if (house.isPresent()) {
			Optional<Rent> optionalBill = rentRepo.findByLatestIsTrueAndHouseId(house.get().getId());
			if (optionalBill.isPresent()) {
				return ResponseEntity.ok(optionalBill.get());
			} else {
				return ResponseEntity.badRequest().body(new MessageResponse(RENT_NOT_FOUND));
			}
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(HOUSE_NOT_FOUND));
		}
	}

	@GetMapping("/latest")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<Rent> test1() {
		return rentRepo.findByLatestIsTrue();
	}

	@GetMapping("/{housename}")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> findAllByName(@PathVariable String housename) {
		Optional<House> house = houseRepo.findByName(housename);
		if (house.isPresent()) {
			List<Rent> rentList = rentRepo.findByHouseId(house.get().getId());
			if (rentList.isEmpty()) {
				return ResponseEntity.badRequest().body(new MessageResponse(RENT_NOT_FOUND));
			} else {
				return ResponseEntity.ok(rentList);
			}
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(HOUSE_NOT_FOUND));
		}
	}

	@PostMapping()
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<?> addRent(@Valid @RequestBody RentRequest rentReq) {
		Optional<House> house = houseRepo.findByName(rentReq.getHouseName());
		if (house.isPresent()) {
			Optional<Rent> latestBill = rentRepo.findByLatestIsTrueAndHouseId(house.get().getId());
			List<Rent> rentList = new ArrayList<>();
			if (latestBill.isPresent()) {
				Rent oldRent = latestBill.get();
				oldRent.setLatest(false);
				rentList.add(oldRent);
			}
			LocalDateTime now = LocalDateTime.now();
			Rent rent = Rent.builder().latest(true).bill(rentReq.getBill()).house(house.get()).date(now).build();
			rentList.add(rent);
			rentRepo.saveAll(rentList);
			return ResponseEntity.ok(new MessageResponse("Rent Added successfully!"));
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(HOUSE_NOT_FOUND));
		}
	}
}
