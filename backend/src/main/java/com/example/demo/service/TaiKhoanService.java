package com.example.demo.service;

import com.example.demo.entity.KhachHang;

import java.util.Optional;
import java.util.UUID;

public interface TaiKhoanService {
    KhachHang login(String email);
    Optional<KhachHang> forgetPassword(String email) ;
    void save(KhachHang khachHang);
    Optional<KhachHang> findByResetToken(String resetToken);
    KhachHang singup(KhachHang khachHang) throws Exception ;


}
