package com.sandcastle.immerse.model.dto;

import com.sandcastle.immerse.model.entity.ReservationEntity;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Getter
@NoArgsConstructor
public class ReservationRequest {

    private LocalDate date;
    private Long showId;
    private Long userId;
    public ReservationEntity toReservationEntity(){
        return ReservationEntity.builder()
                .reservationDate(date)
                .showId(showId)
                .userId(userId)
                .build();
    }
}
