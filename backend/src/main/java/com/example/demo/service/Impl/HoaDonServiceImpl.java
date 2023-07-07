package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDon;
import com.example.demo.repository.HoaDonReponsitory;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class HoaDonServiceImpl implements HoaDonService{
    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;

    @Override
    public Page<HoaDon> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonReponsitory.findAll(pageable);
    }

    @Override
    public HoaDon add(HoaDon hoaDon) {
        return hoaDonReponsitory.save(hoaDon);
    }

    @Override
    public HoaDon update(HoaDon hoaDon, UUID id) {
        if(hoaDonReponsitory.existsById(id)) {
            return hoaDonReponsitory.save(hoaDon);
        }
        return null;
    }

    @Override
    public HoaDon detail(UUID id) {
        return hoaDonReponsitory.findById(id).orElse(null);
    }

//    @Override
//    public HoaDon delete(UUID id) {
//        return hoaDonReponsitory.deleteById(id);
//    }
}
