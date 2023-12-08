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
public class NhanVienRequest {

    private String ma;

    private String hoTen;

    private String anhDaiDien;

    private Boolean gioiTinh;

    private String email;

    private String matKhau;

    private String soDienThoai;

    private Date ngaySinh;

    private Timestamp ngayTao;

    private Timestamp ngaySua;

    private String diaChiCuThe;

    private String tinhThanhPho;

    private String quanHuyen;

    private String phuongXa;

    private Boolean daXoa;

    private String tenChucVu;
}
