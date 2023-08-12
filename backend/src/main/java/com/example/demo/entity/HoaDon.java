package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "hoa_don")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ngay_tao")
    private Timestamp ngayTao;

    @Column(name = "ngay_dat_hang")
    private Timestamp ngayDatHang;

    @Column(name = "ngay_thanh_toan")
    private Timestamp ngayThanhToan;

    @Column(name = "ngay_ship")
    private Timestamp ngayShip;

    @Column(name = "ngay_mong_muon_nhan")
    private Timestamp ngayMongMuonNhan;

    @Column(name = "ngay_co_the_nhan")
    private Timestamp ngayCoTheNhan;

    @Column(name = "ngay_nhan_duoc_hang")
    private Timestamp ngayNhanDuocHang;

    @Column(name = "ten_khach_hang")
    private String tenKhachHang;

    @Column(name = "dia_chi_khach_hang")
    private String diaChiKhachHang;

    @Column(name = "so_dien_thoai_khach_hang")
    private String soDienThoaiKhachHang;

    @Column(name = "phi_ship")
    private BigDecimal phiShip;

    @Column(name = "phu_phi")
    private BigDecimal phuPhi;

    @Column(name = "phi_hoan_tra")
    private BigDecimal phiHoanTra;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "tong_tien")
    private BigDecimal tongTien;

    @Column(name = "ngay_sua")
    private Timestamp ngaySua;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_sua")
    private String nguoiSua;

    @Column(name = "da_xoa")
    private Boolean daXoa;
}
