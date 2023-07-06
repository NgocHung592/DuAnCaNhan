package com.example.demo.service;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.KieuDang;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface KieuDangService {

    Page<KieuDang> getAll(Integer pageNo);

    KieuDang add(KieuDang kieuDang);

    KieuDang update(KieuDang kieuDang, UUID id);

    KieuDang detail(UUID id);

    void delete(UUID id);
}
