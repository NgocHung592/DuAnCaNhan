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

    private String daXoa;

    private String maSanPham;

    private String tenSanPham;

    private String moTa;

    private List<KichThuocChiTietRequest> kichThuocChiTiets;

    private UUID idChatLieu;

    private UUID idPhongCach;

    private UUID idHoaTiet;

    private UUID idCoAo;

    private UUID idTayAo;

}
