package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.request.NhanVienRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface NhanVienService {
    Page<NhanVien> getAll(Integer pageNo);

    List<NhanVien> getListStatus();

    NhanVien add(NhanVienRequest nhanVienRequest);

    NhanVien update(NhanVienRequest nhanVienRequest, UUID id);

    NhanVien detail(UUID id);

    void delete(UUID id);
}
