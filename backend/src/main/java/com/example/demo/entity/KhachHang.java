package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="hang_khach_hang")
public class KhachHang {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name="ma")
    private String ma;
    @Column(name="ten")
    private String ten;
    @Column(name="so_hoa_don_toi_thieu")
    private Integer sohoadoitoithieu;
    @Column(name="so_tien_toi_thieu")
    private BigDecimal sotientoithieu;
    @Column(name="mo_ta")
    private String mota;
    @Column(name="trang_thai")
    private Integer trangthai;
    @Column(name="ngay_tao)")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    private Date ngaytaoo;
    @Column(name="ngay_sua")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    private Date ngaysua;
    @Column(name="nguoi_tao")
    private String nguoitao;
    @Column(name="nguoi_sua")
    private String nguoisua;
    @Column(name="da_xoa")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    private Date daxoa;
}
