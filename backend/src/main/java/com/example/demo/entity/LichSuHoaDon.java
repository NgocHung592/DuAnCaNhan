package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "lich_su_hoa_don")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LichSuHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ngay_cap_nhap")
    private Timestamp ngayCapNhap;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "loai_hoa_don")
    private String loaiHoaDon;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id")
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "tai_khoan_id", referencedColumnName = "id")
    private TaiKhoan taiKhoan;
}
