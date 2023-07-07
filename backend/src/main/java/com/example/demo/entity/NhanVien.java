package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="phan_quyen")
public class NhanVien {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name="ngay_tao")
    private Date ngaytao;
    @Column(name="ten")
    private String ten;
    @Column(name="ma")
    private String ma;
    @Column(name="trang_thai")
    private Integer trangthai;
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
