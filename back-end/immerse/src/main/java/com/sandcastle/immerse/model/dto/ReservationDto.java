package com.sandcastle.immerse.model.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationDto {

	//    private Long reservationId;
	private LocalDate reservationDate;

	private Long showId;

	private Long userId;
}
