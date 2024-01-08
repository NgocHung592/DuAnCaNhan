package com.example.demo.service;

import com.example.demo.model.response.ThongKeReponse;

import java.util.List;

public interface ThongKeService {
    List<ThongKeReponse> getTongDoanhThu();
    List<ThongKeReponse> getTongDonHang();
    List<ThongKeReponse> getTongSanPham();
    List<ThongKeReponse> getTongKhachHang();
}
