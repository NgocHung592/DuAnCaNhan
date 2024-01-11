package com.example.demo.model.response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeReponse {
//    @Value("#{target.id}")
//    String getID();
//
//    @Value("#{target.ma}")
//    String getMa();
@Value("#{target.thang}")
Integer getThang();

    @Value("#{target.nam}")
    Integer getNam();

//    @Value("#{target.tong_khach_hang}")
//    String getTongKhachHang();
//
    @Value("#{target.tong_doanh_thu}")
    Double getTongDoanhThu();

//    @Value("#{target.thong_ke_tong_hop}")
//    String getThongKeTongHop();

    @Value("#{target.tong_don_hang}")
    Integer getTongDonHang();

    @Value("#{target.tong_san_pham}")
    Integer getTongSanPham();

//    @Value("#{target.ngay_thanh_toan}")
//    String getNgayThanhToan();
//
//    @Value("#{target.tong_tien}")
//    String getTongTien();

//    @Value("#{target.so_luong}")
//    String getSoLuong();

//    @Value("#{target.gia_tri}")
//    String getGiaTri();
//
//    @Value("#{target.loai_thong_ke}")
//    String getLoaiThognKe();
}
