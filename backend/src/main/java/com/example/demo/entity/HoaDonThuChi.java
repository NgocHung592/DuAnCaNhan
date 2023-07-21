package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "hoa_don_chi_tiet")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HoaDonThuChi {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;


    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "don_gia")
    private BigDecimal donGia;

    @Column(name = "thanh_tien")
    private BigDecimal thanhTien;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id")
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "san_pham_chi_tiet_id")
    private SanPhamChiTiet sanPhamChiTiet;
}
