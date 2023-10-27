package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SanPhamChiTietResponse {

    @Value("#{target.id}")
    String getIdSanPham();

    @Value("#{target.ten}")
    String getTenSanPham();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.ten}")
    String getTenChatLieu();

    @Value("#{target.ten}")
    String getTenPhongCach();

    @Value("#{target.ten}")
    String getTenHoaTiet();

    @Value("#{target.ten}")
    String getTenTayAo();

    @Value("#{target.ten}")
    String getTenCoAo();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();
}
