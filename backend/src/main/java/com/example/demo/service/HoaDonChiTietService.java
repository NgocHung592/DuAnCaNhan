package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDonChiTietId;
import com.example.demo.model.request.HoaDonChiTietRequest;
import com.example.demo.model.response.HoaDonChiTietReponse;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface HoaDonChiTietService {
    Page<HoaDonChiTietReponse> getAll(Integer pageNo);

    HoaDonChiTiet add(HoaDonChiTietRequest hoaDonChiTietRequest);

    HoaDonChiTiet update(HoaDonChiTiet hoaDonChiTiet, HoaDonChiTietId hoaDonChiTietId);

    HoaDonChiTiet detail(HoaDonChiTietId hoaDonChiTietId);

    HoaDonChiTiet delete(UUID id);
}
