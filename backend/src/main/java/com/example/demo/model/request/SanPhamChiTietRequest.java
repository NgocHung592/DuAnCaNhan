package com.example.demo.model.request;

 import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class SanPhamChiTietRequest {

    private String soLuong;

    private Double gia;

    private String daXoa;

    private String tenSanPham;

    private String tenDanhMuc;

    private String tenChatLieu;

    private String tenHoaTiet;

    private String tenKichThuoc;

    private String tenMauSac;

    private String tenPhongCach;

}
