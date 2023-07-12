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

    private String gia;

    private String trangThai;

    private UUID idDanhMuc;

}
