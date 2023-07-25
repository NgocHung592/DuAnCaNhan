package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SanPhamChiTietResponse {

    @Value("#{target.id_san_pham}")
    String getIDSanPham();

    @Value("#{target.ten}")
    String getTen();

    @Value("#{target.anh_noi_bat}")
    String getAnhNoiBat();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.gia_min}")
    BigDecimal getGiaMin();

    @Value("#{target.gia_max}")
    BigDecimal getGiaMax();

    @Value("#{target.mo_ta}")
    String getMoTa();

    @Value("#{target.trang_thai}")
    Integer getTrangThai();
}
