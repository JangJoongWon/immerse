package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.EffectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EffectRepository extends JpaRepository<EffectEntity, Long> {

    Optional<EffectEntity> findByEffectId(Long effectId);

    @Query(value = "SELECT e " +
            "FROM EffectEntity e " +
            "INNER JOIN UserEffectEntity ue " +
            "ON e.id = ue.effectId.id " +
            "WHERE ue.userId.id = :userId ")
    List<EffectEntity> findEffects(@Param("userId") Long userId);
}
