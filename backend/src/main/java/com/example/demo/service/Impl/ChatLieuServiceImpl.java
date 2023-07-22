package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
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
    public List<ChatLieu> getAllByStatus() {
        return chatLieuRepository.getAllByStatus();
    }

    @Override
    public ChatLieu add(ChatLieu chatLieu) {
        long currentTimestampMillis = System.currentTimeMillis();

        ChatLieu chatLieuSave= ChatLieu.builder()
                .ma(chatLieu.getMa())
                .ten(chatLieu.getTen())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .daXoa(chatLieu.getDaXoa())
                .build();
        return chatLieuRepository.save(chatLieuSave);
    }

    @Override
    public ChatLieu update(ChatLieu chatLieu, UUID id) {
        if (chatLieuRepository.existsById(id)){
            return chatLieuRepository.save(chatLieu);
        }
        return null;
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
