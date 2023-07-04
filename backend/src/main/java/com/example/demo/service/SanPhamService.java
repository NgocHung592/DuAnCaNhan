package com.example.demo.service;

import com.example.demo.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface SanPhamService {

    Page<SanPham> getAll(Integer pageNo);

    SanPham add(SanPham sanPham);

    SanPham update(SanPham sanPham, UUID id);

    SanPham detail(UUID id);

    void delete(UUID id);
}
