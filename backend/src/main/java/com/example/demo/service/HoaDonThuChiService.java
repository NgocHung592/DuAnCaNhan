package com.example.demo.service;

import com.example.demo.entity.HoaDonThuChi;
import org.springframework.data.domain.Page;

public interface HoaDonThuChiService {
    Page<HoaDonThuChi> getAll(Integer pageNo);
}
