package com.example.demo.service;


import com.example.demo.entity.TaiKhoan;
import com.example.demo.model.request.KhachHangRequest;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface KhachHangService {
    Page<TaiKhoan> getAll(Integer pageNo);

    List<TaiKhoan> getListStatus();

    TaiKhoan add(KhachHangRequest khachHangRequest);

    TaiKhoan update(KhachHangRequest khachHangRequest, UUID id);

    TaiKhoan detail(UUID id);

    void delete(UUID id);
    Page<TaiKhoan> getten(String ma , Integer pageNo);

    Page<TaiKhoan> gettenn(String sdt ,Integer pageNo);
    Page<TaiKhoan> gettennt(String ten ,Integer pageNo);

}
