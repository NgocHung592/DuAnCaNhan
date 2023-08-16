package com.example.demo.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class KichThuocChiTietRequest {

    private String soLuong;

    private Double gia;

    private String tenKichThuoc;

    private String tenMauSac;

    private String sanPhamChiTiet;

    private String ngayTao;

    private String nguoiTao;

    private String ngaySua;

    private String nguoiSua;
}
