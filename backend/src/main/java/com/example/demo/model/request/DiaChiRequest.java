package com.example.demo.model.request;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class DiaChiRequest {
//    private String hoTenTaiKhoan;
//    private String maTaiKhoan;
//    private String emailTaiKhoan;
//    private String sdtTaiKhoan;
//    private String gioiTinhTaiKhoan;
//    private Date ngaySinhTaiKhoan;
    private String ten;
    private Integer trangThai;
    private String diaChiMacDinh;
    private UUID idTaiKhoan;
    private String mota;
    private Date ngayTao;
    private String quanHuyen;
    private String phuongXa;
    private String tinhThanhPho;



}
