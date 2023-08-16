package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SanPhamChiTietResponse {

    @Value("#{target.id_san_pham_chi_tiet}")
    String getIDSanPhamChiTiet();

    @Value("#{target.ten_san_pham}")
    String getTenSanPham();

    @Value("#{target.ten_mau_sac}")
    String getTenMauSac();

    @Value("#{target.ten_kich_thuoc}")
    String getTenKichThuoc();

    @Value("#{target.anh_noi_bat}")
    String getAnhNoiBat();

    @Value("#{target.so_luong}")
    Integer getSoLuong();

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.da_xoa}")
    Boolean getDaXoa();
}
