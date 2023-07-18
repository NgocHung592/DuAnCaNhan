package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDonThuChi;
import com.example.demo.repository.HoaDonThuChiRepository;
import com.example.demo.service.HoaDonThuChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HoaDonThuChiServiceImpl implements  HoaDonThuChiService{
    @Autowired
    private HoaDonThuChiRepository hoaDonReponsitory;

    @Override
    public Page<HoaDonThuChi> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonReponsitory.findAll(pageable);
    }

}
