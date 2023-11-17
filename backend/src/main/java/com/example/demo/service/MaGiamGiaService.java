package com.example.demo.service;

import com.example.demo.entity.MaGiamGia;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface MaGiamGiaService {
    Page<MaGiamGia> getAll(Integer pageNo);

    MaGiamGia add(MaGiamGia khuyenMai) throws Exception;

    MaGiamGia update(MaGiamGia khuyenMai, UUID id);

    MaGiamGia detail(UUID id);
}
