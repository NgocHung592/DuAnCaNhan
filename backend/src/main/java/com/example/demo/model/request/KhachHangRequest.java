package com.example.demo.model.request;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
public class KhachHangRequest {
    private String ma;

    private String ten;

    private String email;

    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @Temporal(TemporalType.DATE)
    private Date ngaytao;

    private String trangThai;

    private UUID idHangKhachHang;
}
