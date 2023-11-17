package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "lich_su_hoa_don")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HinhThucThanhToan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ten")
    private String ten;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "ngay_tao")
    private Timestamp ngayTao;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id")
    private HoaDon hoaDon;
}
