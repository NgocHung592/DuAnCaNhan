package com.example.demo.service;

import com.example.demo.entity.HoaTiet;
import com.example.demo.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface HoaTietService {
    Page<HoaTiet> getAll(Integer pageNo);

    HoaTiet add(HoaTiet hoaTiet);

    HoaTiet update(HoaTiet hoaTiet, UUID id);

    HoaTiet detail(UUID id);

    void delete(UUID id);
}
