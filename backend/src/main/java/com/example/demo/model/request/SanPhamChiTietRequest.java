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

    private Double gia;

    private String daXoa;

    private String maSanPham;

    private String tenSanPham;

    private String idChatLieu;

    private String idPhongCach;

    private String idHoaTiet;

    private String idCoAo;

    private String idTayAo;

    private String idMauSac;

}
