package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private final ReservationService reservationService;

//    @GetMapping("")



}
