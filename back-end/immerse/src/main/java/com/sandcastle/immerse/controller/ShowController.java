package com.sandcastle.immerse.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sandcastle.immerse.model.dto.show.ShowListResponse;
import com.sandcastle.immerse.model.dto.show.ShowRequest;
import com.sandcastle.immerse.model.dto.show.ShowResponse;
import com.sandcastle.immerse.service.ShowService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/shows")
@RequiredArgsConstructor
public class ShowController {

	private final ShowService showService;

	@ResponseBody
	@GetMapping("/")
	public List<ShowListResponse> getShows() {
		return showService.getShows();
	}

	@ResponseBody
	@GetMapping("/{show_id}")
	public ResponseEntity<ShowResponse> getShow(@PathVariable Long show_id) {
		Optional<ShowResponse> res = showService.findShow(show_id);
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
	public Long postShow(@RequestBody ShowRequest form, Authentication auth) {
		Long userId = Long.valueOf(auth.getName());
		form.setUserId(userId);
		return showService.postShow(form);
	}

	@ResponseBody
	@PutMapping("/{show_id}")
	public Long putShow(@PathVariable Long show_id, @RequestBody ShowRequest form) {
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
}
