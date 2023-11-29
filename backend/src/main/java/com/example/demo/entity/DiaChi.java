
package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Table(name = "dia_chi")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "dia_chi_mac_dinh")
    private String diaChiMacDinh;

    @Column(name = "dia_chi_cu_the")
    private String diaChiCuThe;

    @Column(name = "tinh_thanh_pho")
    private String tinhThanhPho;

    @Column(name = "quan_huyen")
    private String quanHuyen;

    @Column(name = "phuong_xa")
    private String phuongXa;

    @Column(name = "ngay_tao")
    private Timestamp ngayTao;

    @Column(name = "ngay_sua")
    private Timestamp ngaySua;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_sua")
    private String nguoiSua;

    @Column(name = "da_xoa")
    private Boolean daXoa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "khach_hang_id", referencedColumnName = "id")
    private KhachHang khachHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nhan_vien_id", referencedColumnName = "id")
    private NhanVien nhanVien;


}
