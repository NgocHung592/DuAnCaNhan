package com.example.demo.model.request;

import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GioHangNoLoginRequset {
        private UUID gioHangChiTietId;
        private UUID sanPhamChiTietId;
        private int soLuong;
}
