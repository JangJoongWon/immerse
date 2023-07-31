package com.sandcastle.immerse.model.dto.user;

import lombok.Data;

@Data
public class UserSigninRequest {

    private String email;
    private String password;

}
