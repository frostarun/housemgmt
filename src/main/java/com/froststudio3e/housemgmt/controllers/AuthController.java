package com.froststudio3e.housemgmt.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.froststudio3e.housemgmt.models.User;
import com.froststudio3e.housemgmt.payload.request.LoginRequest;
import com.froststudio3e.housemgmt.payload.request.SignupRequest;
import com.froststudio3e.housemgmt.payload.response.JwtResponse;
import com.froststudio3e.housemgmt.payload.response.MessageResponse;
import com.froststudio3e.housemgmt.repository.UserRepository;
import com.froststudio3e.housemgmt.security.jwt.JwtUtils;
import com.froststudio3e.housemgmt.service.AuthService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/user")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	AuthService authService;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/auth")
	public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		return ResponseEntity.ok(authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword()));
	}

	@PostMapping()
	public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}
		User user = new User(signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()));
		user.setHouse(authService.getHouse(signUpRequest.getHouse()));
		user.setRoles(authService.getRoles(signUpRequest.getRoles()));
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@DeleteMapping("/{username}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<MessageResponse> deleteUser(@PathVariable String username) {
		Optional<User> user = userRepository.findByUsername(username);
		if (user.isPresent()) {
			userRepository.delete(user.get());
			return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
		}
	}
}
