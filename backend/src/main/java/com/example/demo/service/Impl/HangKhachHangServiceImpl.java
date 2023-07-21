package com.example.demo.service.Impl;

import com.example.demo.entity.HangKhachHang;
import com.example.demo.repository.HangKhachHangRepository;
import com.example.demo.service.HangKhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HangKhachHangServiceImpl implements HangKhachHangService {
    @Autowired
    private HangKhachHangRepository  hangKhachHangRepository;
    @Override
    public List<HangKhachHang> getListStatus() {
        return hangKhachHangRepository.getListStatus();
    }
}
