package com.sandcastle.immerse.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.dto.show.ShowListResponse;
import com.sandcastle.immerse.model.entity.ReservationEntity;
import com.sandcastle.immerse.model.entity.ShowEntity;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.ReservationRepository;
import com.sandcastle.immerse.repository.ShowRepository;
import com.sandcastle.immerse.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service 클래스는 비즈니스 로직을 수행하는 클래스이다.
 * Repository 클래스를 통해 데이터베이스와 통신하며, 비즈니스 로직을 수행
 * @Service : Service 클래스 임을 나타내는 것이다.
 * @Autowired : Spring Container 가 자동으로 의존성을 주입해 주어 해당 클래스에 있는 메서드를 사용할 수 있다.
 * @Transactional : 트랜잭션을 적용하여, DB 와의 통신을 하는 메서드에 입력한다.
 * @RequiredArgsConstructor : private final 로 생성한 생성자들을 자동으로 @Autowired , 의존성을 주입해 준다.
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;
	private final ShowRepository showRepository;
	/**
	 * Tanssactional 은 트랜잭션을 적용하는데 사용됨
	 * 하나의 작업 단위를 나타내며, 이 어노테이션에 사용할 수 있는 속성은 다음과 같다.
	 * isolation : 트랜잭션의 격리 수준 // default : READ_COMMIT
	 * propagaion : 트랜잭션의 전파 방식 // default : REQUIRED
	 * readOnly : 트랜잭션을 읽기 전용으로 설정합니다. // default : false
	 * timeout : 트랜잭션의 타임아웃을 지정합니다. // default : -1
	 */

	/**
	 * Reservation Entity 을 builder 로 구성하여 이를 테이블에 저장하는 기능
	 */
	@Override
	@Transactional
	public Long postReservation(Long showId, Long userId) throws IllegalArgumentException {

		UserEntity user = userRepository.findById(userId)
			.orElseThrow(() -> new IllegalArgumentException("No such user!"));

		ShowEntity show = showRepository.findById(showId)
			.orElseThrow(() -> new IllegalArgumentException("No such show!"));

		ReservationEntity reservation = ReservationEntity.builder()
			.reservationDate(LocalDate.now())
			.showEntity(show)
			.userEntity(user)
			.build();

		return reservationRepository.save(reservation).getReservationID();
	}

	/**
	 * 지금 존재하는 모든 예약 테이블 조회
	 * @return 모든 예약 엔티티로 이루어진 리스트로 반환
	 */
	@Override
	public List<ReservationEntity> findALLReservation() {
		return reservationRepository.findAll();
	}

	/**
	 * 예약 고유 번호를 통하여 예약 정보를 조회할 수 있는 기능
	 * @param id : Reservation_id
	 * @return : ReservationEntity
	 */
	@Override
	public Optional<ReservationEntity> findByIdReservation(Long id) {
		return reservationRepository.findById(id);
	}

	/**
	 * 특정 유저의 예약 리스트 조회 : 특정 유저의 ID 를 통하여 예약정보 리스트를 조회할 수 있는 기능
	 * @param userId : 특정 유저의 고유 번호
	 */
	@Override
	public List<ShowListResponse> findListReservationByUserId(Long userId) {
		List<ReservationEntity> entityList = reservationRepository.findListReservationByUserId(userId);
		return entityList.stream().map(e -> new ShowListResponse(e.getShowEntity())).collect(Collectors.toList());
	}

	/**
	 * 특정 공연의 예약 리스트 조회 : 특정 공연 ID 를 통하여 예약정보 리스트를 조회할 수 있는 기능
	 * @param showId : 특정 공연의 고유 ID
	 */
	@Override
	public List<UserDto> findListReservationByShowId(Long showId) {
		List<ReservationEntity> entityList = reservationRepository.findListReservationByShowId(showId);
		return entityList.stream().map(e -> UserDto.builder().
			userId(e.getUserEntity().getUserId()).
			nickname(e.getUserEntity().getNickname())
			.build()).collect(Collectors.toList());
	}

	/**
	 * 예약 취소 : 예약 고유 번호를 통하여 예약 정보를 삭제할 수 있는 기능
	 * @id : 예약 고유 번호
	 * reservationRepository 안에 있는 쿼리문을 불러와서 테이블을 삭제한다.
	 */
	@Override
	@Transactional
	public void deleteByReservationId(Long id) {
		reservationRepository.deleteByReservationId(id);
	}

}
