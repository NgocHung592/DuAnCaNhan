package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.GioHangRequset;
import com.example.demo.model.response.GioHangChiTietReponse;

import java.util.List;
import java.util.UUID;

public interface GioHangService {
    void GioHang(UUID sanPhamChiTietId, UUID khachHangId,Integer soLuong);
    void Xoa(UUID gioHangId);
    KhachHang getKhachHangById(UUID id);
    List<GioHangChiTietReponse> getAll(UUID id);
    void delete(UUID id);
    void update(GioHangRequset gioHangRequset);
}
