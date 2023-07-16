package com.example.demo.service;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChatLieuService {

    Page<ChatLieu> getAll(Integer pageNo);

    List<ChatLieu> getAllByStatus();

    ChatLieu add(ChatLieu chatLieu);

    ChatLieu update(ChatLieu chatLieu, UUID id);

    ChatLieu detail(UUID id);

    void delete(UUID id);
}
