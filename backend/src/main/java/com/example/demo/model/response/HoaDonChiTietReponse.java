package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface HoaDonChiTietReponse {

    @Value("#{target.id_hoa_don_chi_tiet}")
    String getIdHoaDonChiTiet();

    @Value("#{target.ma_hoa_don}")
    String getMaHoaDon();

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

    @Value("#{target.thanh_tien}")
    BigDecimal getThanhTien();
}
