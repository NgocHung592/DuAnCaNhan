package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "ma_giam_gia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MaGiamGia {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    private String tenKM;

    @Column(name = "hinh_thuc_giam")
    private int hinhThucGiam;

    @Column(name = "trang_thai")
    private int trangThai;

    @Column(name = "so_luong")
    private int soLuong;

    @Column(name = "gia_tri_don_toi_thieu")
    private BigDecimal giaTriDonToiThieu;

    @Column(name = "gia_tri_giam_toi_da")
    private BigDecimal giaTriGiamToiDa;

    @Column(name = "ngay_bat_dau")
    private Date ngayBatDau;

    @Column(name = "ngay_ket_thuc")
    private Date ngayKetThuc;

    @Column(name = "ngay_tao")
    private Instant ngayTao = new Date().toInstant();

    @Column(name = "ngay_sua")
    private Instant ngaySua = new Date().toInstant();

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_sua")
    private String nguoiSua;

    @Column(name = "da_xoa")
    private Boolean daXoa;

}
