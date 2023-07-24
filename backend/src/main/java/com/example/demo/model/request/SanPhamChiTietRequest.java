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

    private UUID idSanPham;

    private UUID idDanhMuc;

    private UUID idChatLieu;

    private UUID idHoaTiet;

    private UUID idKichThuoc;

    private UUID idMauSac;

    private UUID idPhongCach;

}
