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

    @Column(name = "ngay_sua")
    private Timestamp ngay_sua;

    @Column(name = "nguoi_sua")
    private String nguoi_sua;

    @Column(name = "noi_dung")
    private String noi_dung;

    @Column(name = "trang_thai_hoa_don")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id")
    private HoaDon hoaDon;

}
