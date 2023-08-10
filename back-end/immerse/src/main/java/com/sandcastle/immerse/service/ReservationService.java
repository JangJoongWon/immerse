package com.sandcastle.immerse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.dto.show.ShowListResponse;
import com.sandcastle.immerse.model.entity.ReservationEntity;

@Transactional(readOnly = true)
public interface ReservationService {

	@Transactional(readOnly = false)
	public Long postReservation(Long showId, Long userId) throws IllegalArgumentException;

	List<ReservationEntity> findALLReservation();

	Optional<ReservationEntity> findByIdReservation(Long id);

	List<ShowListResponse> findListReservationByUserId(Long userId);

	List<UserDto> findListReservationByShowId(Long showId);

	@Transactional(readOnly = false)
	void deleteByReservationId(Long id);
}
