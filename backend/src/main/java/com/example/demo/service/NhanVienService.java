package com.example.demo.service;

import com.example.demo.entity.TaiKhoan;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.request.NhanVienRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface NhanVienService {
    Page<TaiKhoan> getAll(Integer pageNo);

    Page<TaiKhoan> getListStatus(Integer pageNo);

    TaiKhoan add(NhanVienRequest nhanVienRequest);

    TaiKhoan update(NhanVienRequest nhanVienRequest, UUID id);

    TaiKhoan detail(UUID id);

    List<TaiKhoan> getTT(Integer tt);

    Page<TaiKhoan> getten(String ma ,Integer pageNo);

    Page<TaiKhoan> gettenn(String sdt ,Integer pageNo);
    Page<TaiKhoan> gettennt(String ten ,Integer pageNo);

    void delete(UUID id);
//    Page<NhanVien> getAllbyma(String ma,Integer pageNo);
}
