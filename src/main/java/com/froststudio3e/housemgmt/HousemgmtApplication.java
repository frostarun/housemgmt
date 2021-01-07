package com.froststudio3e.housemgmt;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.froststudio3e.housemgmt.models.Bill;
import com.froststudio3e.housemgmt.models.BillUnit;
import com.froststudio3e.housemgmt.models.ERole;
import com.froststudio3e.housemgmt.models.House;
import com.froststudio3e.housemgmt.models.Rent;
import com.froststudio3e.housemgmt.models.Role;
import com.froststudio3e.housemgmt.models.User;
import com.froststudio3e.housemgmt.repository.HouseRepository;
import com.froststudio3e.housemgmt.repository.RentRepository;
import com.froststudio3e.housemgmt.repository.RoleRepository;
import com.froststudio3e.housemgmt.repository.UserRepository;
import com.froststudio3e.housemgmt.service.BillingService;

@SpringBootApplication
public class HousemgmtApplication {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private static final String OWNER = "Owner";

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private HouseRepository houseRepository;

	@Autowired
	private RentRepository rentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	PasswordEncoder encoder;

	public static void main(String[] args) {
		SpringApplication.run(HousemgmtApplication.class, args);
	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {
			try {
				List<Role> roleList=Arrays.asList(
						new Role(ERole.ROLE_ADMIN), 
						new Role(ERole.ROLE_MODERATOR), 
						new Role(ERole.ROLE_USER));
				houseRepository.save(House.builder().name(OWNER).build());
				roleRepository.saveAll(roleList);
				for (int i = 0; i < 10; i++) {
					if(i==5) {
						rentRepository.save(buildRent(true));
					}else {
						rentRepository.save(buildRent(false));
					}
				}
				userRepository.save(registerUser());
				logger.info("Preload INFO : Successfully loaded data");
			} catch (DuplicateKeyException e) {
				logger.info("Preload INFO : Already preloaded data available");
			} catch (Exception e) {
				logger.error("Error in inserting Preload data",e.getMessage());
			}
		};
	}

	private Rent buildRent(boolean latest) {
		Optional<House> house = houseRepository.findByName(OWNER);
		if (house.isPresent()) {
			LocalDateTime now = LocalDateTime.now();
			ArrayList<BillUnit> billunits = new ArrayList<>();
			billunits.add(BillUnit.builder().name("rent").unit("0").amount("10000").build());
			billunits.add(BillUnit.builder().name("electricity").unit("15").amount("4000").build());
			billunits.add(BillUnit.builder().name("maintanence").unit("0").amount("400").build());
			
			return Rent.builder().latest(latest)
					.bill(Bill.builder()
							.bills(billunits)
							.total(BillingService.calculateTotal(billunits)).build())
					.house(house.get())
					.date(now).build();
		} else {
			return null;
		}
	}
	
	private User registerUser() {
		String userName = "admin";
		String password = "admin123$$";
		Set<Role> roles = new HashSet<>();
		roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(() -> new RuntimeException("Role not found")));
		roles.add(roleRepository.findByName(ERole.ROLE_MODERATOR).orElseThrow(() -> new RuntimeException("Role not found")));
		User user = new User(userName, encoder.encode(password));
		user.setHouse(houseRepository.findByName(OWNER).orElseThrow(() -> new RuntimeException("Error: House is not found.")));
		user.setRoles(roles);
		return user;
	}

}
