package com.example.demo.model.request;

 import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

 import java.util.List;
 import java.util.UUID;

@Getter
@Setter
@Builder
@ToString
public class SanPhamChiTietRequest {

    private String maSanPham;

    private String tenSanPham;

    private String giaBan;

    private String soLuong;

    private String urlImage;

    private String moTa;

    private String daXoa;

    private UUID idChatLieu;

    private UUID idPhongCach;

    private UUID idHoaTiet;

    private UUID idCoAo;

    private UUID idTayAo;

    private String tenKichThuoc;

    private String tenMauSac;



}
