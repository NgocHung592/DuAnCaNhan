package com.example.demo.service;

import com.example.demo.entity.MaGiamGiaChiTiet;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface MaGiamGiaChiTietService {
    Page<MaGiamGiaChiTiet> getAll(Integer pageNo);

    MaGiamGiaChiTiet add(MaGiamGiaChiTiet maGiamGiaChiTiet) throws Exception;

    MaGiamGiaChiTiet update(MaGiamGiaChiTiet maGiamGiaChiTiet, UUID id);

    MaGiamGiaChiTiet detail(UUID id);
}
