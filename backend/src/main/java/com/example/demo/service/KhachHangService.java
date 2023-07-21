package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.KhachHangRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface KhachHangService {
    Page<KhachHang> getAll(Integer pageNo);

    List<KhachHang> getListStatus();

    KhachHang add(KhachHangRequest khachHangRequest);

    KhachHang update(KhachHangRequest khachHangRequest, UUID id);

    KhachHang detail(UUID id);

    void delete(UUID id);
}
