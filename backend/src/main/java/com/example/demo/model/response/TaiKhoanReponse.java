package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface TaiKhoanReponse {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.ho_ten}")
    String getHoTen();
    @Value("#{target.email}")
    String getEmail();
    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();
    @Value("#{target.ngay_sinh}")
    Date getNgaySinh();
    @Value("#{target.ten_hang}")
    String getTenHang();
    @Value("#{target.ten_vai_tro}")
    String getTenVaiTro();
    @Value("#{target.trang_thai}")
    Integer getTrangThai();
    @Value("#{target.ngay_tao}")
    String getNgayTao();
    @Value("#{target.mo_ta}")
    String getMoTa();
    @Value("#{target.phuong_xa}")
    String getPhuongXa();
    @Value("#{target.tinh_thanh_pho}")
    String getTinhThanhPho();
    @Value("#{target.quan_huyen}")
    String getQuanHuyen();


}
