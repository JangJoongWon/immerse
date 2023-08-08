package com.sandcastle.immerse.data;

import lombok.Builder;
import lombok.Getter;

import static java.lang.Math.max;

/**
 * OpenVidu Session을 담기 위한 클래스
 */
@Builder
@Getter
public class Room {
    private int connections; // 동시 접속자 수
    private int maxConnections; // 최고 접속자 수

    public void increaseConnection() {
        maxConnections = max(++connections, maxConnections);
    }

    public void decreaseConnection() {
        connections--;
    }
}
