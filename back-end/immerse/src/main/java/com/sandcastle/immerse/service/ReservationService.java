package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ReservationDto;
import com.sandcastle.immerse.model.entity.ReservationEntity;
import org.springframework.security.core.Authentication;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ReservationService {

    @Transactional
    public Long postReservation(ReservationDto request,Long showId, Authentication authentication);
    @Transactional
    List<ReservationEntity> findALLReservation();

    @Transactional
    Optional<ReservationEntity> findByIdReservation(Long id);



    @Transactional
    List<ReservationEntity> findListReservationByUserId(Long userId);

    @Transactional
    List<ReservationEntity> findListReservationByShowId(Long showId);

//    @Transactional
//    void deleteByReservationId(Long id);
}
