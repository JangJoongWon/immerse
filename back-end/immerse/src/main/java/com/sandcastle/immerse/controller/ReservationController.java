package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.ReservationDto;
import com.sandcastle.immerse.service.ReservationServiceImpl;
import com.sandcastle.immerse.service.ShowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller Setting
 * @RestController : @Controller 와 비슷한 기능으로 써, 컨트롤러의 역할을 부여한다.
 * 두 어노테이션의 공통점은 HTTP 요청을 처리하고 응답을 생성하는 기능을 가진다.
 * 차이점은 @Controller 는 HTML 응답을 생성하고
 * @RestController 는 JSON 응답을 생성하여 처리하는 것이다.
 *
 * @RequestMapping 은 Spring MVC 에서 HTTP 요청을 처리하는 메서드를 정의하는데
 * 사용되는 어노테이션
 * 역할 : HTTP 요청의 URL, METHOD, 요청 파라미터 등을 지정 할 수 있다.
 * 속성은 다음과 같다
 * value : HTTP요청의 URL을 지정 // default : ""
 * method : [GET/POST/PUT/DELETE] HTTP 요청의 메서드를 지정 // default : GET
 * params : HTTP 속성의 파라미터 지정, 이 파라미터 일때만 작동한다 //default : ""
 * header : 헤더 지정, 하나 및 여러개의 헤더를 지정 가능
 * consumes : HTTP 요청의 본문을 소비하는 미디어 타입 지정 // {application/json} 이면, json 미디어 타입의 요청만 처이
 * procedure : HTTP 응답의 본문을 생성하는 미디어 타입 지정 // consumes 과 같은 형식으로 작성
 * @RequiredArgsConstructor 는 private final로 지정한 객체들을 자동으로 @Autowired 애노테이션 적용
 *
 */
@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationServiceImpl reservationService;
    private final ShowService showService;

    /**
     * 예약 등록하기
     * 이건 공연 페이지의 공연 만들기 또한 같이 포함하여야 한다.
     */
    @ResponseBody
    @PostMapping("/{showId}")
    public Long postShow(@RequestBody ReservationDto request ,@PathVariable Long showId , Authentication authentication) throws Exception {
        return reservationService.postReservation(request, showId , authentication);
    }

    /**
     * 모든 예약 리스트 조회하기
     *
     * @return List<Reservation Entity>
     *
     * ResponseEntity<?> ResponseEntity는 HTTP 응답을 나타냅니다.
     * ResponseEntity는 HTTP 응답 상태 코드, 응답 헤더 및 응답 본문을 포함합니다.
     * ResponseEntity<?>는 어떤 종류의 객체라도 포함할 수 있는 ResponseEntity입니다.
     * 예를 들어, List<ResponseEntity<?>>는 ResponseEntity의 목록을 나타냅니다.
     * 이 목록에는 ResponseEntity의 모든 종류의 객체가 포함될 수 있습니다.
     */
    @GetMapping("")
    public ResponseEntity<?> getReservations() {
        System.out.println("get All Reservations");
        return ResponseEntity.ok(reservationService.findALLReservation());
    }

    /**
     * 예약 고유번호를 이용하여 예약 정보를 조회하는 기능
     *
     * @return
     */

    @GetMapping("/{reservationId}")
    public ResponseEntity<?> getReservationById(@PathVariable Long reservationId) {
        Optional<?> result = reservationService.findByIdReservation(reservationId);
        if(result.isPresent()){
            System.out.println("Reservation id : "+reservationId +" Found" );
            return ResponseEntity.ok(result);
        } else {
            System.out.println("Reservaion not Found");
            return null;
        }
    }
    /**
     * 특정 유저의 예약 리스트 조회
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findListReservationByUserId(@PathVariable Long userId){
        System.out.println("get All Reservations , user_id :" + userId);
        return ResponseEntity.ok(reservationService.findListReservationByUserId(userId));
    }

    /**
     * 특정 공연의 예약 리스트 조회
     */
    @GetMapping("/show/{showId}")
    public ResponseEntity<?> findListReservationByShowId(@PathVariable Long showId){
        System.out.println("get All Reservations , show_id :" + showId);
        return ResponseEntity.ok(reservationService.findListReservationByShowId(showId));
    }

    /**
     * 특정 공연의 예약을 한 예약의 개수 조회
     * 이 공연이 매진 되었는지, 최대 인원에 맞는지 확인하기 위해 사용하는 기능
     */


    @GetMapping("/show/{showId}/count")
    public Integer findLengthReservationByShowId(@PathVariable Long showId){
        return reservationService.findListReservationByShowId(showId).size();
    }

    /**
     * 예약 고유 번호를 인자값으로 하여 특정 예약 정보를 테이블에서 지우는 기능
     */
//    @DeleteMapping("/{reservationId}")
//    public void deleteReservationById(@PathVariable Long reservationId){
//        Optional<?> result = reservationService.findByIdReservation(reservationId);
//        if(result.isPresent()){
//            reservationService.deleteByReservationId(reservationId);
//            System.out.println("Reservation Delete Complete");
//        } else {
//            System.out.println("Reservation not Found");
//        }
//        return ;
//    }
}