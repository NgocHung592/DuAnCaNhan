package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDonChiTietId;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {
    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Override
    public Page<HoaDonChiTiet> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonChiTietRepository.findAll(pageable);
    }

    @Override
    public HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet) {
        return hoaDonChiTietRepository.save(hoaDonChiTiet);
    }

    @Override
    public HoaDonChiTiet update(HoaDonChiTiet hoaDonChiTiet, HoaDonChiTietId hoaDonChiTietId) {
        if(hoaDonChiTietRepository.existsById(hoaDonChiTietId)) {
            return hoaDonChiTietRepository.save(hoaDonChiTiet);
        }
        return null;
    }

    @Override
    public HoaDonChiTiet detail(HoaDonChiTietId hoaDonChiTietId) {
        return hoaDonChiTietRepository.findById(hoaDonChiTietId).orElse(null);
    }

//    @Override
//    public HoaDonChiTiet delete(HoaDonChiTietId hoaDonChiTietId) {
//        return null;
//    }
}
