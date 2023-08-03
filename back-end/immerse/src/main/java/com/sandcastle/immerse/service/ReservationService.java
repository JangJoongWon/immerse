package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ReservationRequest;
import com.sandcastle.immerse.model.entity.ReservationEntity;
import com.sandcastle.immerse.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.sandcastle.immerse.model.dto.ReservaionDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Service 클래스는 비즈니스 로직을 수행하는 클래스이다.
 * Repository 클래스를 통해 데이터베이스와 통신하며, 비즈니스 로직을 수행
 * @Service : Service 클래스 임을 나타내는 것이다.
 * @Autowired : Spring Container 가 자동으로 의존성을 주입해 주어 해당 클래스에 있는 메서드를 사용할 수 있다.
 * @Transactional : 트랜잭션을 적용하여, DB 와의 통신을 하는 메서드에 입력한다.
 * @RequiredArgsConstructor : private final 로 생성한 생성자들을 자동으로 @Autowired , 의존성을 주입해 준다.
 */
@Service
@RequiredArgsConstructor
public class ReservationService implements ReservationServiceImpl {

    private final ReservationRepository reservationRepository;
//    private final ShowRepository showRepository;
    /**
     * Tanssactional 은 트랜잭션을 적용하는데 사용됨
     * 하나의 작업 단위를 나타내며, 이 어노테이션에 사용할 수 있는 속성은 다음과 같다.
     * isolation : 트랜잭션의 격리 수준 // default : READ_COMMIT
     * propagaion : 트랜잭션의 전파 방식 // default : REQUIRED
     * readOnly : 트랜잭션을 읽기 전용으로 설정합니다. // default : false
     * timeout : 트랜잭션의 타임아웃을 지정합니다. // default : -1
     */


    /**
     * 지금 존재하는 모든 예약 테이블 조회
     * @return 모든 예약 엔티티로 이루어진 리스트로 반환
     */
    @Override
    @Transactional
    public List<ReservationEntity> findALLReservation() {
        return reservationRepository.findAll();
    }
    //public List<CategoryEntity> findCategories() {
    //		return categoryRepository.findAll();
    //	}

    /**
     * 예약 고유 번호를 통하여 예약 정보를 조회할 수 있는 기능
     * @param id : Reservation_id
     * @return : ReservationEntity
     */
    @Override
    @Transactional
    public Optional<ReservationEntity> findByIdReservation(Long id){
        return reservationRepository.findById(id);
    }

    /**
     * Reservation Entity 을 builder 로 구성하여 이를 테이블에 저장하는 기능
     */


    /**
     * 예약 취소 : 예약 고유 번호를 통하여 예약 정보를 삭제할 수 있는 기능
     * @id : 예약 고유 번호
     * reservationRepository 안에 있는 쿼리문을 불러와서 테이블을 삭제한다.
     */
    @Override
    @Transactional
    public void deleteByReservationId(Long id){
        reservationRepository.deleteReservationByReservationId(id);
    }

    /**
     * 특정 유저의 예약 리스트 조회 : 특정 유저의 ID 를 통하여 예약정보 리스트를 조회할 수 있는 기능
     * @param userId : 특정 유저의 고유 번호
     */
    @Override
    @Transactional
    public List<ReservationEntity> findListReservationByUserId(Long userId){
        return reservationRepository.findListReservationByUserId(userId);
    }

    /**
     * 특정 공연의 예약 리스트 조회 : 특정 공연 ID 를 통하여 예약정보 리스트를 조회할 수 있는 기능
     * @param showId : 특정 공연의 고유 ID
     */
    @Override
    @Transactional
    public List<ReservationEntity> findListReservationByShowId(Long showId){
        return reservationRepository.findListReservationByShowId(showId);
    }

    /**
     * 특정 공연의 예약 수 : 특정 공연의 예약 리스트 를 조회 한 후 리스트의 길이를 계산한다.
     * @param showId : 특정 공연의 고유 ID
     */
    @Override
    @Transactional
    public Integer findLengthReservationByShowId(Long showId){
        return reservationRepository.findListReservationByShowId(showId).size();
    }

    /**
     * 예약 하는 방 만들기
     *
     */
    @Transactional
    public Long postReservation(ReservationRequest request){

        ReservationEntity reservation = ReservationEntity.builder()
                .reservationDate(request.getDate())
                .showId(request.getShowId())
                .userId(request.getUserId())
                .build();
        return reservationRepository.save(reservation).getReservationID();
    }

}
