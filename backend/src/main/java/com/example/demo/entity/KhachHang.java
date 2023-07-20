package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
@Table(name="tai_khoan")
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private UUID id;
    @Column(name="ma")
    private  String ma;
    @Column(name="ho_ten")
    private  String hoten;
//    @Column(name="so_dien_thoai")
//    private  String sodienthoai;
    @Column(name="email")
    private  String email;
//    @Column(name="gioi_tinh")
//    private  Boolean gioitinh;
//    @DateTimeFormat(pattern = "dd/MM/yyyy")
//    @Temporal(TemporalType.DATE)
//    @Column(name="ngay_sinh")
//    private Date ngaysinh;
    @Column(name="ngay_tao")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @Temporal(TemporalType.DATE)
    private Date ngaytao;
//    @Column(name="anh_dai_dien")
//    private  String anhdaidien;
//    @Column(name="mat_khau")
//    private  String matkhau;
//    @Column(name="ghi_chu")
//    private  String ghichu;
    @Column(name="trang_thai")
    private  Integer trangThai;


    @ManyToOne()
    @JoinColumn(name="hang_khach_hang",referencedColumnName = "id")
    private HangKhachHang hangKhachHang;
}
