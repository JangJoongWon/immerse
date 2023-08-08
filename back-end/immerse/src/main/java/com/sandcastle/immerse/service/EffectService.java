package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.entity.EffectEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface EffectService {
    void saveEffect(Long userId, Long effectId);

    List<EffectEntity> findEffectByUserId(Long userId);
}
