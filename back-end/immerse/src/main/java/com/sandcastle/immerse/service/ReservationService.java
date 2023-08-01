package com.sandcastle.immerse.service;

import com.sandcastle.immerse.repository.ReservationRepository;
import com.sandcastle.immerse.repository.ShowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ShowRepository showRepository;
    /**
     * Tanssactional 은 트랜잭션을 적용하는데 사용됨
     * 하나의 작업 단위를 나타내며, 이 어노테이션에 사용할 수 있는 속성은 다음과 같다.
     * isolation : 트랜잭션의 격리 수준 // default : READ_COMMIT
     * propagaion : 트랜잭션의 전파 방식 // default : REQUIRED
     * readOnly : 트랜잭션을 읽기 전용으로 설정합니다. // default : false
     * timeout : 트랜잭션의 타임아웃을 지정합니다. // default : -1
     */



}
