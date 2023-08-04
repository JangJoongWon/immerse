package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.ShowTagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowTagRepository extends JpaRepository<ShowTagEntity, Long> {

}
