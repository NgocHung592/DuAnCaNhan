package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDonChiTietId;
import org.springframework.data.domain.Page;

public interface HoaDonChiTietService {
    Page<HoaDonChiTiet> getAll(Integer pageNo);

    HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet);

    HoaDonChiTiet update(HoaDonChiTiet hoaDonChiTiet, HoaDonChiTietId hoaDonChiTietId);

    HoaDonChiTiet detail(HoaDonChiTietId hoaDonChiTietId);

//    HoaDonChiTiet delete(HoaDonChiTietId hoaDonChiTietId);
}
