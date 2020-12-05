package com.froststudio3e.housemgmt.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.froststudio3e.housemgmt.models.Rent;

@Repository
public interface RentRepository extends MongoRepository<Rent, String> {

	@Query(value = "{'house.name' : ?0 }", fields = "{ 'house.name' : 0 }")
	List<Rent> findByHouseName(String name);
	
	Rent findByLatestIsTrueAndHouseName(String name);

}
