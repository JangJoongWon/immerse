package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.entity.EffectEntity;
import com.sandcastle.immerse.service.EffectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/effect")
public class EffectController {

    private final EffectService EffectServiceImpl;
    @PostMapping("/{effectId}")
    public ResponseEntity<?> saveEffect(Authentication authentication, @PathVariable Long effectId) {
        Long userId = Long.valueOf(authentication.getName());
        EffectServiceImpl.saveEffect(userId, effectId);
        return ResponseEntity.ok().body("이펙트 저장완료");
    }

    @GetMapping("/")
    public ResponseEntity<?> findEffectByUserId(Authentication authentication) {
        List<EffectEntity> effectEntityList = EffectServiceImpl.findAllEffect();
        return ResponseEntity.ok().body(effectEntityList);
    }

}
