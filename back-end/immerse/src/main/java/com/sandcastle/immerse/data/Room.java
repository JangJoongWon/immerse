package com.sandcastle.immerse.data;

import lombok.Builder;
import lombok.Getter;

/**
 * OpenVidu Session을 담기 위한 클래스
 */
@Builder
@Getter
public class Room {
    private String artist; // 공연자
    private int connections; // 동시 접속자 수

    public void increaseConnection() {
        connections++;
    }

    public void decreaseConnection() {
        connections--;
    }
}
