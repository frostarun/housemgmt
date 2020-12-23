package com.froststudio3e.housemgmt.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.froststudio3e.housemgmt.models.PassCode;
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

	private static final String USER_NOT_FOUND = "User not found";
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

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
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		logger.debug("loginRequest :" + loginRequest);
		loginRequest.setPassword(AuthService.decrypt(loginRequest.getPassword()));
		logger.debug("loginRequest :" + loginRequest);
		JwtResponse authenticateUser = authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
		if (ObjectUtils.isEmpty(authenticateUser.getError())) {
			return ResponseEntity.ok(authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword()));
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(authenticateUser.getError()));
		}
	}

	@PostMapping()
	public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (Boolean.TRUE.equals(userRepository.existsByUsername(signUpRequest.getUsername()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
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
			return ResponseEntity.badRequest().body(new MessageResponse(USER_NOT_FOUND));
		}
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUsers() {
		List<User> userList = userRepository.findAll();
		if (userList.isEmpty()) {
			return ResponseEntity.badRequest().body(new MessageResponse(USER_NOT_FOUND));
		} else {
			return ResponseEntity.ok().body(userList);
		}
	}

	@GetMapping("/{username}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getUser(@PathVariable String username) {
		Optional<User> user = userRepository.findByUsername(username);
		if (user.isPresent()) {
			return ResponseEntity.ok(user.get());
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(USER_NOT_FOUND));
		}
	}

	@PutMapping("/{username}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateUserPassword(@Valid @RequestBody PassCode passcode, @PathVariable String username) {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		if (optionalUser.isPresent()) {
			User givenUser = optionalUser.get();
			givenUser.setPassword(encoder.encode(passcode.getPassword()));
			userRepository.save(givenUser);
			return ResponseEntity.ok(new MessageResponse("User updated"));
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse(USER_NOT_FOUND));
		}
	}
}
