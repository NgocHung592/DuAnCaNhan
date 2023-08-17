package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.math.BigDecimal;
import java.util.UUID;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "hoa_don_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class HoaDonChiTiet {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @Column(name = "so_luong")
//    private Integer soLuong;
//
//    @Column(name = "don_gia")
//    private BigDecimal donGia;
//
//    @Column(name = "thanh_tien")
//    private BigDecimal thanhTien;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id")
//    private HoaDon hoaDon;
//
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kich_thuoc_mau_sac_id", referencedColumnName = "id")
    private KichThuocMauSac kichThuocMauSac;
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
    @JoinColumn(name = "san_pham_chi_tiet_id", referencedColumnName = "id")
    private SanPhamChiTiet sanPhamChiTiet;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id")
    private HoaDon hoaDon;

}
