package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.entity.SearchEntity;

public interface SearchService {
    void recodeSearch(Long userId, SearchDto searchDto);
}
