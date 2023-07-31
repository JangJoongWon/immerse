package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.data.Room;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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

    @PostMapping("/")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = params.get("customSessionId").toString();
        if (rooms.containsKey(sessionId)) {
            return new ResponseEntity<>("이미 존재하는 이름입니다.", HttpStatus.CONFLICT);
        }

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = ov.createSession(properties);

        rooms.put(sessionId, Room.builder().artist("anonymous").build());

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }


    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = ov.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}
