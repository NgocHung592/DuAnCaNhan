package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface HoaDonService {
    Page<HoaDon> getAll(Integer pageNo);

    HoaDon add(HoaDon hoaDon);

    HoaDon update(HoaDon hoaDon, UUID id);

    HoaDon detail(UUID id);

//    HoaDon delete(UUID id);
}
