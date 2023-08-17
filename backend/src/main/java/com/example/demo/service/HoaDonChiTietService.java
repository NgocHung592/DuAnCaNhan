package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDonChiTietId;
import com.example.demo.model.request.HoaDonChiTietRequest;
import com.example.demo.model.response.HoaDonChiTietReponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface HoaDonChiTietService {

    List<HoaDonChiTietReponse> getAll(String ma);

    HoaDonChiTiet add(HoaDonChiTietRequest hoaDonChiTietRequest);

    HoaDonChiTiet update(HoaDonChiTietRequest hoaDonChiTietRequest, UUID id);

    HoaDonChiTiet detail(HoaDonChiTietId hoaDonChiTietId);

    HoaDonChiTiet delete(UUID id);

}
