package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * extends JpaRepository<ReservationEntity,Long>
 */
public interface ReservationRepository extends JpaRepository<ReservationEntity,Long>  {

  /**
   * 모든 객체를 반환한다.
   * @return
   * DB에 데이터가 존재하지 않으면 빈 List 를 반환하게 된다.
   */
  List<ReservationEntity> findAll();

  /**
   * 특정 ID 를 가진 ReservationEntity 객체를 반환합니다.
   * @param id
   * @return
   *
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


}