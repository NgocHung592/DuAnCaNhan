package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.SanPham;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Override
    public Page<SanPham> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return sanPhamRepository.findAll(pageable);
    }

    @Override
    public List<SanPham> getAllByStatus() {
        return sanPhamRepository.getAllByStatus();
    }

    @Override
    public SanPham add(SanPham sanPham) {
        if(sanPham.getMa().isBlank() ||sanPham.getTen().isBlank()|| sanPham.getMoTa().isBlank()) {
            return null;
        }
        return sanPhamRepository.save(sanPham);
    }

    @Override
    public SanPham update(SanPham sanPham, UUID id) {
       if (sanPhamRepository.existsById(id)){
           return sanPhamRepository.save(sanPham);
       }
        return null;
    }

    @Override
    public SanPham detail(UUID id) {
        return sanPhamRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        sanPhamRepository.deleteById(id);
    }
}
