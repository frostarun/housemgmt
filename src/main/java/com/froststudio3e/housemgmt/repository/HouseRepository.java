package com.froststudio3e.housemgmt.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.froststudio3e.housemgmt.models.House;

@Repository
public interface HouseRepository extends MongoRepository<House, String> {

	Optional<House> findByName(String name);

	boolean existsByName(String name);

	boolean existsById(String Id);
}
