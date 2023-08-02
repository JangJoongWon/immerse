package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * extends JpaRepository<ReservationEntity,Long>
 */
@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity,Long>  {

  /**
   * 모든 객체를 반환한다.
   * @return
   * DB에 데이터가 존재하지 않으면 빈 List 를 반환하게 된다.
   */
  List<ReservationEntity> findAll();

  /**
   * 특정 ID 를 가진 ReservationEntity 객체를 반환합니다.
   * @param id : Reservation 고유번호
   * @return : ReservationEntity(id)
   * Optional<T> 객체는 T타입의 값을 담을 수 있는 객체이다.
   * Optional<T> 값이 존재할 경우, 값을 담고, 아닐 경우 값을 담고 있지 않다.
   * 이러한 값을 담고 있는지 확인 하기 위한 메소드가 -> isPresent()
   * if(Optional<T> reservation.isPresent()){
   *     ...
   * } else{
   *     ...
   * }
   * 으로 표현 할 수 있다.
   */

  Optional<ReservationEntity> findById(Long id);

  /**
   * ReservationEntity 객체를 데이터베이스에 저장합니다.
   * @param reservation
   * @return
   * ++
   * Mono<ReservationEntity> save(ReservationEntity reservation)
   * 해당 ReservationEntity 가 존재하지 않는 다면 DB에 데이터를 저장을 하고
   * 존재한다면 Update를 한다.
   * 값이 존재하는 것을 확인하는 메서드 -> isPresent()
   */
  ReservationEntity save(ReservationEntity reservation);

  /**
   * 데이터베이스에 있는 ReservationEntity 객체를 삭제하는 기능
   * @param reservation
   * ++
   * Mono<ReservationEntity> delete
   * 이 함수는 만약 이 Entity 가 DB에 존재하면 데이터를 삭제하지만
   *  DB에 존재하지 않는 다면 아무런 작업을 수행하지 ㅇ낳습니다.
   */
  void delete(ReservationEntity reservation);

  /**
   * @Query 문은 이러한 레포지토리 안에 있는 쿼리문을 실행 시키는 어노테이션이다.
   * @Query (value = sql____) 라인으로 표현을 하며, 이에 따른 쿼리문을 실행 시키는 인터페이스를 생성한다.
   * 쿼리 문 안에 사용하는 인자 값을 인터페이스의 Arg를 사용하려고 하면,
   * : {value_name} 을 sql 문 안에 삽입하여 사용 할 수 있다.
   * 인터페이스의 인자 값에는 @Param("value_name") 을 사용하여 삽입할 수 있다.
   * 이 때는 Repository 안에 있는 주어진 메서드 명이 아닌 새로운 메서드 명을 작성할 수 있다.
   * @Query 의 속성
   * name: 쿼리의 이름입니다.
   * nativeQuery: 쿼리가 JPQL이 아닌 SQL이면 true로 설정합니다.
   * resultClass: 쿼리의 결과 클래스입니다.
   * resultSetMapping: 쿼리의 결과 세트 매핑입니다.
   * flushAutomatically: 쿼리 실행 후 데이터베이스를 자동으로 플러시합니다.
   * timeout: 쿼리 실행 시간 제한입니다.
   * fetchSize: 쿼리 결과를 한 번에 가져오는 개수입니다.
   * hints: 쿼리에 대한 힌트입니다.
   */

  /**
   * 유저 ID 를 통하여 해당 유저가 예약한 예약 현황 조회
   * @param userId : 해당 유저의 아이디
   * @return 이 유저를 포함하고 있는 모든 예약들을 리스트로 조회
   * @Modifying : 이 쿼리문을 데이터베이스의 트랙잭션을 수행할 수 있다는 어노테이션
   */
  @Modifying
  @Query(value = "SELECT * FROM reservations WHERE user_id = :userID " , nativeQuery = true)
  List<ReservationEntity> findListReservationByUserId(@Param("userID") Long userId);

  /**
   * 해당 공연 ID 를 통하여 이 공연에 예약한 예약자들의 정보를 알 수 있는 테이블 조회
   * @param showId : 해당 공연의 아이디
   * @return 이 공연에 예약을 하고 잇는 예약 정보들을 리스트로 조회
   */
  @Modifying
  @Query(value = "SELECT * FROM reservations WHERE show_id = :showID ", nativeQuery = true)
  List<ReservationEntity> findListReservationByShowId(@Param("showID") Long showId);

  /**
   * 예약 번호를 사용하여 예약 테이블 삭제하는 기능
   * @param reservationId : 예약 번호의 고유번호
   * retrun 값은 void 로 사용하게 된다.
   */
  // Native SQL query to delete a reservation by reservation_id
  @Modifying
  @Query(value = "DELETE FROM reservations WHERE reservation_id = :reservationId", nativeQuery = true)
  void deleteReservationByReservationId(@Param("reservationId") Long reservationId);
}
