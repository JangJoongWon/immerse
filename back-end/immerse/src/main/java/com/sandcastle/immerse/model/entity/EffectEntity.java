package com.sandcastle.immerse.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "effects")
public class EffectEntity {

    @Id
    @Column(name = "effect_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long effectId;

    @NotNull
    @Column(nullable = false)
    private String effect;

    @Builder
    public EffectEntity(Long effectId, String effect) {
        this.effectId = effectId;
        this.effect = effect;
    }

}
