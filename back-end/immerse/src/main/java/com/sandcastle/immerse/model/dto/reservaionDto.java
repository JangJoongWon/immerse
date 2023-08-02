package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class reservaionDto {

    private Long reservationId;
    private LocalDate reservationDate;
    private Long showId;
    private Long userId;


}
