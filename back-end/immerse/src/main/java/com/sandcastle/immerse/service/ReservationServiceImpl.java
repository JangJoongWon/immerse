package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.entity.ReservationEntity;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ReservationServiceImpl {
    @Transactional
    List<ReservationEntity> findALLReservation();

    @Transactional
    Optional<ReservationEntity> findByIdReservation(Long id);

    @Transactional
    void deleteByReservationId(Long id);

    @Transactional
    List<ReservationEntity> findListReservationByUserId(Long userId);

    @Transactional
    List<ReservationEntity> findListReservationByShowId(Long showId);

    @Transactional
    Integer findLengthReservationByShowId(Long showId);
}
