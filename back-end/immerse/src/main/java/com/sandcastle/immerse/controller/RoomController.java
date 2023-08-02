package com.sandcastle.immerse.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin("*")
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

	@PostConstruct
	public void init() {
		this.ov = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
		this.rooms = new ConcurrentHashMap<>();
	}

	/**
	 * 방을 처음 만들 때 호출하는 함수
	 * 공연자가 방에 connect 하기 전 호출함
	 * @param params
	 * @return
	 * @throws OpenViduJavaClientException
	 * @throws OpenViduHttpException
	 */
	@PostMapping("/")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		String sessionId = params.get("customSessionId").toString();
		if (rooms.containsKey(sessionId)) {
			return new ResponseEntity<>("이미 존재하는 이름입니다.", HttpStatus.CONFLICT);
		}

		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = ov.createSession(properties);

		rooms.put(sessionId, Room.builder()
				.artist("anonymous")
				.connections(0)
				.build());

		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}

	/**
	 * 방의 정보를 fetch함
	 * 관객이 방에 connect 하기 전 호출하여 정보를 갱신
	 * @param sessionId
	 * @param params
	 * @return
	 * @throws OpenViduJavaClientException
	 * @throws OpenViduHttpException
	 */
	@PostMapping("/{sessionId}/fetch")
	public ResponseEntity<String> fetchSession(@PathVariable("sessionId") String sessionId,
			@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {

		SessionProperties properties = SessionProperties.fromJson(params).build();
		Session session = ov.createSession(properties);

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
	public ResponseEntity<String> terminateConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = ov.getActiveSession(sessionId);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		if (rooms.containsKey(sessionId)) {
			rooms.remove(sessionId);
		}

		return new ResponseEntity<>("terminated", HttpStatus.NO_CONTENT);
	}

	@PostMapping("/{sessionId}/disconnect")
	public ResponseEntity<String> disconnectConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = ov.getActiveSession(sessionId);
		System.out.println(session);
		System.out.println("---------disconnect---------");
		if (session == null) {
			System.out.println(sessionId + " terminated");
			if (rooms.containsKey(sessionId)) {
				rooms.remove(sessionId);
			}
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		// session.fetch();
		// List<Connection> connections = session.getActiveConnections();
		// System.out.println(connections.size());
		// if (session.getActiveConnections().size() == 0)
		if (rooms.containsKey(sessionId)) {
			rooms.get(sessionId).decreaseConnection();
			if (rooms.get(sessionId).getConnections() == 0)
				rooms.remove(sessionId);
		}

		return new ResponseEntity<>("disconnected", HttpStatus.NO_CONTENT);
	}

}
