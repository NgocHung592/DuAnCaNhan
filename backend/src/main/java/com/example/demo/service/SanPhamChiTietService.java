package com.example.demo.service;

import com.example.demo.entity.KichThuocMauSac;
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

    List<KichThuocMauSac> add(SanPhamChiTietRequest sanPhamChiTietRequest);

    List<KichThuocMauSac> getList(UUID id);
//
//
//    void delete(UUID id);
}
