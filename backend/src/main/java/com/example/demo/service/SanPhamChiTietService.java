package com.example.demo.service;

import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.SanPhamChiTietRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface SanPhamChiTietService {

    Page<SanPhamChiTiet> getAll(Integer pageNo);

    SanPhamChiTiet getOne(UUID id);

    List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests);

    SanPhamChiTiet update(MauSac mauSac, UUID id);

    void delete(UUID id);
}
