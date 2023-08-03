package com.sandcastle.immerse.model.dto;

import com.sandcastle.immerse.model.entity.ShowEntity;
import com.sandcastle.immerse.model.entity.UserEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ReservationDto {

//    private Long reservationId;
    private LocalDate reservationDate;

    private ShowEntity showEntity;

    private UserEntity userEntity;

}
