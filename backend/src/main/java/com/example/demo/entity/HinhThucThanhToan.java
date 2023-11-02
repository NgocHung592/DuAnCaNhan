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

    @Column(name = "noi_dung")
    private String noi_dung;

    @Column(name = "ngay_tao")
    private Timestamp id;

    @Column(name = "nguoi_tao")
    private String nguoi_tao;

    @Column(name = "trang_thai_hoa_don")
    private Integer trangThaiHoaDon;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id",referencedColumnName = "id")
    private HoaDon hoaDon;
}
