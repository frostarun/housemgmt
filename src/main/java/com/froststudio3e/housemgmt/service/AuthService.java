package com.froststudio3e.housemgmt.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.froststudio3e.housemgmt.models.ERole;
import com.froststudio3e.housemgmt.models.House;
import com.froststudio3e.housemgmt.models.Role;
import com.froststudio3e.housemgmt.payload.response.JwtResponse;
import com.froststudio3e.housemgmt.repository.HouseRepository;
import com.froststudio3e.housemgmt.repository.RoleRepository;
import com.froststudio3e.housemgmt.security.jwt.JwtUtils;
import com.froststudio3e.housemgmt.security.services.UserDetailsImpl;

@Service
public class AuthService {

	private static final String ERROR_ROLE_IS_NOT_FOUND = "Error: Role is not found.";

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	HouseRepository houseRepository;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtUtils jwtUtils;

	public JwtResponse authenticateUser(String username, String password) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
		return new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getHouse(), roles);
	}

	public Set<Role> getRoles(Set<String> strRoles) {
		Set<Role> roles = new HashSet<>();
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR).orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException(ERROR_ROLE_IS_NOT_FOUND));
					roles.add(userRole);
				}
			});
		}
		return roles;
	}

	public House getHouse(String house) {
		if (house == null) {
			throw new DataRetrievalFailureException("Error: House is not found.");
		} else {
			return houseRepository.findByName(house).orElseThrow(() -> new RuntimeException("Error: House is not found."));
		}
	}
}
