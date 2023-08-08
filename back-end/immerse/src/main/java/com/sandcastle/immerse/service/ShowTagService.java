package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ShowTagDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ShowTagService{
    void saveAllShowTag (Long showId, List<ShowTagDto> showTagDtoList);
    void updateShowTag (Long showId, List<ShowTagDto> showTagDtoList);
    void deleteShowTag (Long showId);

}
