package com.froststudio3e.housemgmt.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.froststudio3e.housemgmt.models.House;
import com.froststudio3e.housemgmt.payload.response.MessageResponse;
import com.froststudio3e.housemgmt.repository.HouseRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/house")
public class HouseControllerV1 {

	private static final String HOUSE_NOT_FOUND = "House not found!";
	@Autowired
	HouseRepository houseRepository;

	@PostMapping()
	public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody House house) {
		if (Boolean.TRUE.equals(houseRepository.existsByName(house.getName()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: House name is already taken !"));
		}
		House newHouse = House.builder().name(house.getName()).build();
		houseRepository.save(newHouse);
		return ResponseEntity.ok(new MessageResponse("House Added successfully!"));
	}

	@DeleteMapping("/{housename}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<MessageResponse> deleteUser(@PathVariable String housename) {
		Optional<House> house = houseRepository.findByName(housename);
		if (house.isPresent()) {
			houseRepository.delete(house.get());
			return ResponseEntity.ok(new MessageResponse("House deleted successfully!"));
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(HOUSE_NOT_FOUND));
		}
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUsers() {
		List<House> houseList = houseRepository.findAll();
		if (houseList.isEmpty()) {
			return ResponseEntity.badRequest().body(new MessageResponse(HOUSE_NOT_FOUND));
		} else {
			return ResponseEntity.ok().body(houseList);
		}
	}

	@GetMapping("/{housename}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUser(@PathVariable String housename) {
		Optional<House> house = houseRepository.findByName(housename);
		if (house.isPresent()) {
			return ResponseEntity.ok(house.get());
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(HOUSE_NOT_FOUND));
		}
	}
}
