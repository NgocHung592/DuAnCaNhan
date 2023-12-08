package com.example.demo.service;

import com.example.demo.entity.NhanVien;
import com.example.demo.model.response.NhanVienReponse;
import com.example.demo.model.request.NhanVienRequest;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface NhanVienService {

    NhanVien login(String email);

    Page<NhanVien> getAll(Integer pageNo);

    Page<NhanVienReponse> getAllTrangThai(Integer pageNo, String tt);

    NhanVien add(NhanVienRequest nhanVienRequest)  ;

    NhanVien update(NhanVienRequest nhanVienRequest, UUID id)  ;

    Page<NhanVienReponse> getSearch(Integer pageNo, String serch);

    NhanVien detail(UUID id);
}
