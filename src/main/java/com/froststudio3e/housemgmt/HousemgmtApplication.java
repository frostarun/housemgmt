package com.froststudio3e.housemgmt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DuplicateKeyException;

import com.froststudio3e.housemgmt.models.ERole;
import com.froststudio3e.housemgmt.models.House;
import com.froststudio3e.housemgmt.models.Role;
import com.froststudio3e.housemgmt.repository.HouseRepository;
import com.froststudio3e.housemgmt.repository.RoleRepository;

@SpringBootApplication
public class HousemgmtApplication {
	
	 private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private HouseRepository houseRepository;

	public static void main(String[] args) {
		SpringApplication.run(HousemgmtApplication.class, args);
	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {
			try {
				roleRepository.save(new Role(ERole.ROLE_ADMIN));
				roleRepository.save(new Role(ERole.ROLE_MODERATOR));
				roleRepository.save(new Role(ERole.ROLE_USER));
				houseRepository.save(House.builder().name("mercury").build());
				houseRepository.save(House.builder().name("venus").build());
				houseRepository.save(House.builder().name("earth").build());
				houseRepository.save(House.builder().name("mars").build());
			} catch (DuplicateKeyException e) {
				logger.info("Preload INFO : Already preloaded data available");
			} catch (Exception e) {
				logger.error("Error in inserting Preload data");
			}
		};
	}

}
