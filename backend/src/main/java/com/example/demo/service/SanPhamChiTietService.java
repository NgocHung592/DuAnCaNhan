package com.example.demo.service;

import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.request.UpdateSanPham;
import com.example.demo.model.response.SanPhamChiTietResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface SanPhamChiTietService {

    Page<SanPhamChiTietResponse> getAll(Integer pageNo, UUID id);

    Page<SanPhamChiTietResponse> getSanPhamBanHang(Integer pageNo);

    Page<SanPhamChiTietResponse> search(Integer pageNo, String key);


    List<SanPhamChiTietResponse> getSanPhamTrangChu();

    List<SanPhamChiTietResponse> detailSanPham(UUID id);

    SanPhamChiTiet getOne(UUID id);

    List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests);

    SanPhamChiTiet updateSL(int soLuong, UUID id);

    SanPhamChiTiet update(SanPhamChiTietRequest sanPhamChiTietRequest, UUID id);

    SanPhamChiTiet updateSoLuong(List<UpdateSanPham> updateSanPhams);



}
