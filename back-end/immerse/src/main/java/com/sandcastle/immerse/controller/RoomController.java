package com.sandcastle.immerse.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import com.sandcastle.immerse.model.entity.ShowEntity;
import com.sandcastle.immerse.service.ShowService;
import lombok.RequiredArgsConstructor;
import org.apache.http.annotation.Obsolete;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sandcastle.immerse.data.Room;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu ov;

	/**
	 * Room 정보를 담기 위한 해시맵
	 * Key: OpenVidu 토큰을 생성할 때 쓴 sessionId
	 */
	private Map<String, Room> rooms;

	private final ShowService showService;

	@PostConstruct
	public void init() {
		this.ov = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
		this.rooms = new ConcurrentHashMap<>();
	}

	/**
	 * 방을 처음 만들거나 연결하기 전 호출하는 함수
	 * 방의 정보를 fetch함
	 * 공연자 혹은 관객이 방에 connect 하기 전 호출하여 정보를 갱신
	 * @param params
	 * @return
	 * @throws OpenViduJavaClientException
	 * @throws OpenViduHttpException
	 */
	@PostMapping("/")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		String sessionId = params.get("customSessionId").toString();

		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = ov.createSession(properties);

		/**
		 * 아무나 한 명이라도 들어오면 session 정보를 맵에 넣음
		 */
		if (!rooms.containsKey(sessionId)) {
			rooms.put(sessionId, Room.builder()
					.connections(0)
					.maxConnections(0)
					.build());
		}

		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}

	/**
	 * @param sessionId The Session in which to create the Connection
	 * @param params    The Connection properties
	 * @return The Token associated to the Connection
	 */
	@PostMapping("/{sessionId}/connect")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = ov.getActiveSession(sessionId);
		System.out.println("session = " + session);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (rooms.containsKey(sessionId)) {
			rooms.get(sessionId).increaseConnection();
		}

		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}

	/**
	 * 공연 방을 강제로 종료하는 API
	 * 공연자 혹은 관리자가 호출하기 위함
	 * @param sessionId
	 * @param params
	 * @return
	 * @throws OpenViduJavaClientException
	 * @throws OpenViduHttpException
	 */
	@PostMapping("/{sessionId}/terminate")
	public ResponseEntity<String> terminateConnection(
		@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params,
		Authentication authentication
	) throws OpenViduJavaClientException, OpenViduHttpException, IllegalArgumentException {
		Long userId = Long.valueOf(authentication.getName());

		Session session = ov.getActiveSession(sessionId);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (rooms.containsKey(sessionId)) {
			// 공연자 본인일 때만 최고 관객수를 갱신하도록 함
			showService.updateMaxAttendance(Long.valueOf(sessionId), userId, rooms.get(sessionId).getMaxConnections());
			rooms.remove(sessionId);
		}

		return new ResponseEntity<>("terminated", HttpStatus.NO_CONTENT);
	}

	@PostMapping("/{sessionId}/disconnect")
	public ResponseEntity<String> disconnectConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = ov.getActiveSession(sessionId);

		if (session == null) {
			if (rooms.containsKey(sessionId)) {
				rooms.remove(sessionId);
			}
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (rooms.containsKey(sessionId)) {
			rooms.get(sessionId).decreaseConnection();
			if (rooms.get(sessionId).getConnections() == 0)
				rooms.remove(sessionId);
		}

		return new ResponseEntity<>("disconnected", HttpStatus.NO_CONTENT);
	}

}
