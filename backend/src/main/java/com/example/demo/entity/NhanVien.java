package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tai_khoan")
@Builder
public class NhanVien {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id")
    private UUID id;
    @Column(name="ma")
    private  String ma;
    @Column(name="ho_ten")
    private  String hoten;
    @Column(name="so_dien_thoai")
    private  String sodienthoai;
    @Column(name="email")
    private  String email;
    @Column(name="gioi_tinh")
    private  Boolean gioitinh;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    @Column(name="ngay_sinh")
    private Date ngaysinh;
    @Column(name="anh_dai_dien")
    private  String anhdaidien;
    @Column(name="mat_khau")
    private  String matkhau;
    @Column(name="ghi_chu")
    private  String ghichu;
    @Column(name="trang_thai")
    private  Integer trangthai;

//    @ManyToOne
//    @JoinColumn(name="phan_quyen_id")
//    private NhanVien nv;

}