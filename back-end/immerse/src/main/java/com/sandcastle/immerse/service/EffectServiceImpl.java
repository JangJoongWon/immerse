package com.sandcastle.immerse.service;

import com.sandcastle.immerse.exception.AppException;
import com.sandcastle.immerse.exception.ErrorCode;
import com.sandcastle.immerse.model.entity.EffectEntity;
import com.sandcastle.immerse.model.entity.UserEffectEntity;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.EffectRepository;
import com.sandcastle.immerse.repository.UserEffectRepository;
import com.sandcastle.immerse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EffectServiceImpl implements EffectService {

    private final UserEffectRepository userEffectRepository;

    private final EffectRepository effectRepository;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void saveEffect(Long userId, Long effectId) {

        EffectEntity effectEntity = effectRepository.findByEffectId(effectId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException();
                });

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                   return new AppException(ErrorCode.USERID_NOT_FOUND, userId + "은(는) 존재하지 않는 고유번호 입니다.");
                });

        UserEffectEntity userEffectEntity = UserEffectEntity.builder()
                                            .effectId(effectEntity)
                                            .userId(userEntity)
                                            .build();

        userEffectRepository.save(userEffectEntity);
    }

    @Override
    @Transactional
    public List<EffectEntity> findEffectByUserId(Long userId) {
        List<EffectEntity> effectEntityList = effectRepository.findEffects(userId);
        return effectEntityList;
    }

    @Override
    public List<EffectEntity> findAllEffect() {
        return effectRepository.findAll();
    }

}
