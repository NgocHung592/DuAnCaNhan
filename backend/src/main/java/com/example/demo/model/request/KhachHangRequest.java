package com.example.demo.model.request;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class KhachHangRequest {


    private String ma;

    private String ten;

    private String email;

    private Boolean gioitinh;

    private String matkhau;

    private String sodienthoai;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @Temporal(TemporalType.DATE)
    private Date ngaysinh;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @Temporal(TemporalType.DATE)
    private Timestamp ngaytao;
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @Temporal(TemporalType.DATE)
    private Timestamp ngaysua;

    private String trangthai;



    private String mota;

    private String quanHuyen;

    private String phuongXa;

    private String tinhThanhPho;
}
