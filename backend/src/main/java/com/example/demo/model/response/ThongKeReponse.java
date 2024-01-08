package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeReponse {
    @Value("#{target.id}")
    String getID();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.tong_khach_hang}")
    String getTongKhachHang();

    @Value("#{target.tong_doanh_thu}")
    String getTongDoanhThu();

    @Value("#{target.tong_don_hang}")
    String getTongDonHang();

    @Value("#{target.tong_san_pham}")
    String getTongSanPham();

    @Value("#{target.ngay_thanh_toan}")
    String getNgayThanhToan();

    @Value("#{target.tong_tien}")
    String getTongTien();

    @Value("#{target.so_luong}")
    String getSoLuong();
}
