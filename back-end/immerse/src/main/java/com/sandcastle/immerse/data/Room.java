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
}
