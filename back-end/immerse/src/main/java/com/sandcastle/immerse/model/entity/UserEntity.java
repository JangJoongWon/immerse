package com.sandcastle.immerse.model.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sandcastle.immerse.model.dto.UserDto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
	private Long userId;

	@NotNull
	@Column(length = 30, unique = true, nullable = false)
	private String email;

	@NotNull
	@Column(nullable = false)
	private String password;

	@NotNull
	@Column(length = 15, nullable = false)
	private String name;

	@NotNull
	@Column(length = 1, nullable = false)
	private String gender;

	@NotNull
	@Column(length = 15, unique = true, nullable = false)
	private String nickname;

	@NotNull
	@Column(nullable = false)
	private LocalDate birthday;

	@NotNull
	@Column(name = "phone_number", length = 12, nullable = false)
	private String phoneNumber;

	@Column(name = "profile_picture")
	private String profilePicture;

	@Column(name = "banner_picture")
	private String bannerPicture;

	/**
	 * default값을 설정하니 DB에도 자동으로 nullable = false로 설정되어있다.
	 */
	private int point = 0;

	private int status = 1;

	@Lob
	@Column(name = "self_description")
	private String selfDescription;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<ShowEntity> shows = new ArrayList<>();

//	@OneToMany(mappedBy = "followerId")
//	private List<SubscribeEntity> followers = new ArrayList<>();

//	@OneToMany(mappedBy = "followingId")
//	private List<SubscribeEntity> followings = new ArrayList<>();

	@Builder
	public UserEntity(String email, String password, String name, String gender, String nickname, LocalDate birthday,
		String phoneNumber) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.gender = gender;
		this.nickname = nickname;
		this.birthday = birthday;
		this.phoneNumber = phoneNumber;
	}

	public void updateUser(UserDto userDto) {
		this.name = userDto.getName();
		this.nickname = userDto.getNickname();
		// this.phoneNumber = userDto.getPhoneNumber();
		this.profilePicture = userDto.getProfilePicture();
		this.bannerPicture = userDto.getBannerPicture();
		this.selfDescription = userDto.getSelfDescription();
	}

	public int updateStatusWithdrawal() {
		this.status = 0;

		return this.status;
	}
}
