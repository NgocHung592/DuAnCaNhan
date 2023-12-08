package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.response.NhanVienReponse;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.request.NhanVienRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NhanVienService {

    NhanVien login(String email);

    Page<NhanVienReponse> getAll(Integer pageNo);

    Page<NhanVienReponse> getAllTrangThai(Integer pageNo, String tt);

    NhanVien add(NhanVienRequest nhanVienRequest) throws Exception;

    NhanVien update(NhanVienRequest nhanVienRequest, UUID id) throws Exception;

    Page<NhanVienReponse> getSearch(Integer pageNo, String serch);

    NhanVien detail(UUID id);
}
