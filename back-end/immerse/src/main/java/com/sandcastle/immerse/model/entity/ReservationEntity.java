package com.sandcastle.immerse.model.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.time.LocalDate;

/**
 * @Entity 에 @builder 를 사용하는 것을 권장하지 않는 이유
 * ID 는 생성자로 사용하지 안기 위해서
 */
@Entity
@Getter
@NoArgsConstructor
@Table(name = "reservations")
public class ReservationEntity {

    /**
     * 메인 PK 로서 @ID 를 추가하고
     * DB 상의 name 인 Column(name = ____) 을 인식하게 입력한다
     * 자바에서는 Camel style 을 사용하기 때문에 '_' 을 사용하지 않는 방식을
     * 채택하였기 때문에 이를 서로 인식하게 수정해 주어야 한다.
     * strategy = AUTO, IDENTITY, SEQUENCE, TABLE 이 있다.
     * strategy = "IDENTITY" -> AUTO_INCREMENT
     */
    @Id
    @Column(name = "reservation_id" , nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    private  Long reservationID;


    /**
     * @Column 은 JPA Entity 의 속성을 데이터베이스 테이블의 열로 매핑할때 사용
     * 속성 들로는 다음과 같이 있다.
     * name : 데이터베이스의 열 이름  // default : 변수명
     * nullable : 열이 null을 허용할 지 여부 // default : true
     * length : 열의 길이 설정 // default : -1 // 지정하지 않음, 데이터베이스 엔진의 기본 값
     * precision : 열의 소수점 자리 설정 // default : -1 // 지정하지 않음,
     * scale : 열의 정수 자릿수 설정 // default : -1
     * insertable : 열이 삽입될 지 여부 // default : true
     * updatable : 열이 수정 될지 여부 // default : true
     * unique : 열이 유일한 값을 가질지 여부 // default : false
     * columnDefinition : 테이블의 열을 지정하는 DDL // default : null, ex) columnDefinition = "VARCHAR(255)"
     */
    @NotNull
    @Column(name = "reservation_date" , nullable = false)
    private LocalDate reservationDate;

    /**
     * 공연 고유번호
     */
    @ManyToOne(targetEntity = ShowEntity.class , fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id")
    private ShowEntity showEntity;

    /**
     * 예약한 유저의 고유번호
     */
    @ManyToOne(targetEntity = UserEntity.class , fetch = FetchType.LAZY)
    @JoinColumn(name ="user_id")
    private UserEntity userEntity;

    /**
     * @Setter 를 Entity 클래스에서 권장하지 않는다
     * 객체의 상태를 쉽게 바꿀 수 있기 때문에 일관성의 유지가 힘들다
     * 상태를 변경할 때마다 Hibernate가 데이터베이스를 업데이트해야 해서 성능 저하
     * 또한, Hibernate가 객체의 변경사항을 추적해야 한다. 이를 통해 메모리 사용량이 증가한다.
     * 이를 통해 @Setter 를 대신하여 권장하는 방법은 다음과 같다.
     * 상태를 변경할 때 마다 객체의 생성자를 사용한다.
     * 객체의 메서드를 통해 상태를 변경한다.
     * 객체의 팩토리 메서드를 사용하는 방법이 있다.
     */

    /**
     * @Builder
     * 그래서 최초 Entity의 @Builder 를 사용하는 것이 아닌 새로운 생성자 를 사용해서
     * Entity 의 속성을 설정할 수 있다.
     * @Builder 의 속성들은 다음과 같다
     * builderMethodName : 빌더 메서드의 이름을 설정할 수 있다. // default : builder
     * builderClassNmae : 빌더 클래스의 이름을 설정할 수 있다. // default : builder
     * setterMethods : Setter 메서드의 이름을 설정할 수 있다. // default : null
     */
    @Builder
    public ReservationEntity(Long reservationID, LocalDate reservationDate, ShowEntity showEntity, UserEntity userEntity){
        this.reservationID = reservationID;
        this.reservationDate = reservationDate;
        this.showEntity = showEntity;
        this.userEntity = userEntity;
    }



}
