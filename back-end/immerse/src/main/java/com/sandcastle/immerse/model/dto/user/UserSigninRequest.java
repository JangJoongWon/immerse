package com.sandcastle.immerse.model.dto.user;

import com.sandcastle.immerse.model.entity.UserEntity;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.hibernate.type.LocalDateType;

import javax.persistence.Entity;
import java.time.LocalDate;

@Data
@Builder
public class UserSigninRequest {

    private String email;
    private String password;

}
