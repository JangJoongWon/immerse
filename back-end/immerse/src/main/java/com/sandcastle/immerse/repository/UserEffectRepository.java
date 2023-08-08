package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.UserEffectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEffectRepository extends JpaRepository<UserEffectEntity, Long> {
}
