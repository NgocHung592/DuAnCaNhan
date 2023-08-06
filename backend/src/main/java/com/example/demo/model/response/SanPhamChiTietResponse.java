package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SanPhamChiTietResponse {

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIDSanPhamChiTiet();

    @Value("#{target.ten_san_pham}")
    String getTen();

//    @Value("#{target.anh_noi_bat}")
//    String getAnhNoiBat();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.gia}")
    BigDecimal getGia();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();
}
