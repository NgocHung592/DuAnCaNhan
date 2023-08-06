package com.example.demo.service;

import com.example.demo.entity.KichThuocChiTiet;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.response.SanPhamChiTietResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface SanPhamChiTietService {

    Page<SanPhamChiTietResponse> getAll(Integer pageNo);

    Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id,Integer pageNo);

    SanPhamChiTiet getOne(UUID id);

    List<KichThuocChiTiet> add(SanPhamChiTietRequest sanPhamChiTietRequest);

    List<KichThuocChiTiet> getList(UUID id);
//
//
//    void delete(UUID id);
}
