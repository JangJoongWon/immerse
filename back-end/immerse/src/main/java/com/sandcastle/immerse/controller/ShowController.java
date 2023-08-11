package com.sandcastle.immerse.controller;

import java.net.Authenticator;
import java.util.List;
import java.util.Optional;

import com.sandcastle.immerse.model.dto.ShowTagDto;
import com.sandcastle.immerse.model.dto.TagDto;
import com.sandcastle.immerse.model.dto.show.ShowWrapper;
import com.sandcastle.immerse.service.ShowTagServiceImpl;
import com.sandcastle.immerse.service.StorageServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import com.sandcastle.immerse.model.dto.show.ShowListResponse;
import com.sandcastle.immerse.model.dto.show.ShowRequest;
import com.sandcastle.immerse.model.dto.show.ShowResponse;
import com.sandcastle.immerse.service.ShowService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/shows")
@RequiredArgsConstructor
public class ShowController {

	private final ShowService showService;
	private final ShowTagServiceImpl showTagService;
	private StorageServiceImpl storageService;
	@ResponseBody
	@GetMapping("/")
	public List<ShowListResponse> getShows() {
		return showService.getShows();
	}

	@ResponseBody
	@GetMapping("/{show_id}")
	public ResponseEntity<ShowResponse> getShow(@PathVariable Long show_id) {
		Optional<ShowResponse> res = showService.findShow(show_id);
		if (res.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return new ResponseEntity<ShowResponse>(res.get(), HttpStatus.OK);
	}

	@ResponseBody
	@GetMapping("/categories/{category_id}")
	public List<ShowListResponse> findShowsByCategory(@PathVariable Long category_id) {
		return showService.findShowsByCategory(category_id);
		// return categoryService.getCategory(category_id).get().getShows();
	}

	@ResponseBody
	@PostMapping("/")
	public Long postShow(@RequestBody ShowRequest form,  Authentication auth) {
		Long userId = Long.valueOf(auth.getName());
		System.out.println("userId = " + userId);

//		ShowRequest form = wrapper.getForm();
//		MultipartFile file = wrapper.getFile();

		form.setUserId(userId);
		if(form.getThumbnail() == ""){
			Long defualtCategory = form.getCategoryId();

			switch (defualtCategory.intValue()) {
				case 0:
					form.setThumbnail("case_0_thumbnail");
					// defualtCategory 값이 0일 때 수행할 작업
					break;
				case 1:
					form.setThumbnail("case_1_thumbnail");
					// defualtCategory 값이 1일 때 수행할 작업
					break;
				case 2:
					form.setThumbnail("case_2_thumbnail");
					// defualtCategory 값이 2일 때 수행할 작업
					break;
				case 3:
					form.setThumbnail("case_3_thumbnail");
					// defualtCategory 값이 3일 때 수행할 작업
					break;
				// 추가적인 case 문을 필요에 따라 작성할 수 있습니다.
				default:
					// 위의 case에 해당하지 않는 경우의 기본 작업
					break;
			}
		}

		Long showId = showService.postShow(form);
		showTagService.saveAllShowTag(showId , form.getShowTagDtoList());
		return showId;
	}

	@ResponseBody
	@PutMapping("/{show_id}")
	public Long putShow(@PathVariable Long show_id, @RequestBody ShowWrapper wrapper) {

		ShowRequest form = wrapper.getForm();
		MultipartFile file = wrapper.getFile();

		form.setThumbnail(storageService.uploadFile(file));
		return showService.putShow(show_id, form);
	}

	/**
	 * 공연중인 것중 인기 순 20개 가지고 오는 기능
	 */
	@ResponseBody
	@GetMapping("/popular/progress")
	public List<ShowListResponse> getShowOrderByProgress() {
		return showService.getShowsOrderByProgress();
	}

	/**
	 * 예약준인 공연중 인기 순 20개 가지고 오는 기능
	 */
	@ResponseBody
	@GetMapping("/popular/reservation")
	public List<ShowListResponse> getShowOrderByReservation() {
		return showService.getShowsOrderByReservation();
	}

	/**
	 * 예약중인 공연을 진행중 상태로 바꾸는 API
	 * 공연자 본인만 호출
	 */
	@ResponseBody
	@PutMapping("/{show_id}/start")
	public ResponseEntity<?> startShow(@PathVariable Long show_id, Authentication authentication) {
		Long user_id = Long.valueOf(authentication.getName());
		log.trace("user: " + user_id);
		log.trace("show: " + show_id);
		showService.startShow(show_id, user_id);

		return ResponseEntity.ok().body("show started successfully.");
	}

	/**
	 * 진행중인 공연을 끝남 상태로 바꾸는 API
	 * 공연자 본인만 호출
	 */
	@ResponseBody
	@PutMapping("/{show_id}/finish")
	public ResponseEntity<?> finishShow(@PathVariable Long show_id, Authentication auth) {
		Long user_id = Long.valueOf(auth.getName());
		showService.finishShow(show_id, user_id);
		showTagService.deleteShowTag(show_id);

		return ResponseEntity.ok().body("show finished successfully.");
	}
}
