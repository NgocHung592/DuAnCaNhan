package com.example.demo.service;

import com.example.demo.entity.NhanVien;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface NhanVienService {
    Page<NhanVien> getAll(Integer pageNo);

    List<NhanVien> getAllByStatus();

    NhanVien getOne(UUID id);

    NhanVien add(NhanVien nhanVien);

    NhanVien update(NhanVien nhanVien, UUID id);

    void delete(UUID id);
}
