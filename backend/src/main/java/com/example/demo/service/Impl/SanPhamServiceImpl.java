package com.example.demo.service.Impl;

import com.example.demo.entity.SanPham;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class SanPhamServiceImpl implements SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Override
    public Page<SanPham> getAll(Integer pageNo) {
        return null;
    }

    @Override
    public SanPham add(SanPham sanPham) {
        return null;
    }

    @Override
    public SanPham update(SanPham sanPham, UUID id) {
        return null;
    }

    @Override
    public SanPham detail(UUID id) {
        return null;
    }

    @Override
    public void delete(UUID id) {

    }
}
