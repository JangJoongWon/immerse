package com.sandcastle.immerse.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users_effects")
public class UserEffectEntity {

    @Id
    @Column(name = "user_effect_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userEffectId;

    // 단방향 ManyToOne
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "effect_id", nullable = false)
    private EffectEntity effectId;

    // 단방향 ManyToOne
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userId;

    @Builder
    public UserEffectEntity(Long userEffectId, EffectEntity effectId, UserEntity userId) {
        this.userEffectId = userEffectId;
        this.effectId = effectId;
        this.userId = userId;
    }

}
