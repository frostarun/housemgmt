package com.froststudio3e.housemgmt.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.froststudio3e.housemgmt.models.ERole;
import com.froststudio3e.housemgmt.models.Role;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
