package com.example.demo.service;

import com.example.demo.entity.KhuyenMai;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface KhuyenMaiService {
    Page<KhuyenMai> getAll(Integer pageNo);
    KhuyenMai add(KhuyenMai khuyenMai);
    KhuyenMai update(KhuyenMai khuyenMai, UUID id);
    KhuyenMai detail(UUID id);
}
