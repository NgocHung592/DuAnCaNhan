package com.example.demo.service.Impl;

import com.example.demo.model.response.ThongKeReponse;
import com.example.demo.repository.ThongKeRepository;
import com.example.demo.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    private ThongKeRepository thongKeRepository;
    @Override
    public List<ThongKeReponse> getTongDoanhThu() {
        return thongKeRepository.getTongDoanhThu();
    }

    @Override
    public List<ThongKeReponse> getTongDonHang() {
        return thongKeRepository.getTongDonHang();
    }

    @Override
    public List<ThongKeReponse> getTongSanPham() {
        return thongKeRepository.getTongSanPham();
    }

    @Override
    public List<ThongKeReponse> getTongKhachHang() {
        return thongKeRepository.getTongKhachHang();
    }
}
