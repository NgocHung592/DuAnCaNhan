package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class ChatLieuServiceImpl implements ChatLieuService {

    @Autowired
    private ChatLieuRepository chatLieuRepository;

    @Override
    public Page<ChatLieu> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return chatLieuRepository.findAll(pageable);
    }

    @Override
    public ChatLieu add(ChatLieu chatLieu) {
        ChatLieu chatLieu1 = ChatLieu.builder()
                .ma(chatLieu.getMa())
                .ten(chatLieu.getTen())
                .moTa(chatLieu.getMoTa())
                .trangThai(Integer.valueOf(chatLieu.getTrangThai()))
                .build();
        return chatLieu1;
    }

    @Override
    public ChatLieu update(ChatLieu chatLieu, UUID id) {
        ChatLieu chatLieu1 = ChatLieu.builder()
                .id(chatLieu.getId())
                .ma(chatLieu.getMa())
                .ten(chatLieu.getTen())
                .moTa(chatLieu.getMoTa())
                .trangThai(Integer.valueOf(chatLieu.getTrangThai()))
                .build();
        return chatLieu1;
    }

    @Override
    public ChatLieu detail(UUID id) {
        return chatLieuRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        chatLieuRepository.deleteById(id);
    }
}
