package com.froststudio3e.housemgmt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.froststudio3e.housemgmt.models.Rent;

@Repository
public interface RentRepository extends MongoRepository<Rent, String> {

	Optional<Rent> findByLatestIsTrueAndHouseId(String id);

	List<Rent> findByHouseIdOrderByDateDesc(String id);

	List<Rent> findByLatestIsTrue();

}
