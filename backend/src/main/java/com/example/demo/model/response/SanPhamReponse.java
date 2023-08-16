package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SanPhamReponse {

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIDSanPhamChiTiet();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.anh_noi_bat}")
    String getAnhNoiBat();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();
}
