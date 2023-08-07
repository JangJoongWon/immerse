package com.sandcastle.immerse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.sandcastle.immerse.model.dto.show.ShowListResponse;
import com.sandcastle.immerse.model.dto.show.ShowRequest;
import com.sandcastle.immerse.model.dto.show.ShowResponse;

@Transactional(readOnly = true)
public interface ShowService {

	public Optional<ShowResponse> findShow(Long id);

	public List<ShowListResponse> getShows();

	public List<ShowListResponse> findShowsByCategory(Long categoryId);

	/**
	 * 공연자가 만든 공연 조회
	 * @param userId: 공연자
	 * @return
	 */
	public List<ShowListResponse> findShowsByUser(Long userId);

	/**
	 * 공연중인 것중 인기순 20개 조회
	 * @return
	 */
	public List<ShowListResponse> getShowsOrderByProgress();

	/**
	 * 예약중인 공연 중 인기순 20개 조회
	 * @return
	 */
	public List<ShowListResponse> getShowsOrderByReservation();

	@Transactional(readOnly = false)
	public Long postShow(ShowRequest req);

	@Transactional(readOnly = false)
	public Long putShow(Long showId, ShowRequest req);

	@Transactional(readOnly = false)
    public Long startShow(Long showId, Long userId) throws IllegalStateException, IllegalArgumentException;

	@Transactional(readOnly = false)
	public Long finishShow(Long showId, Long userId) throws IllegalStateException, IllegalArgumentException;
}
