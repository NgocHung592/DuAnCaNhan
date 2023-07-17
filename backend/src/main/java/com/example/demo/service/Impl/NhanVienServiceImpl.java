package com.example.demo.service.Impl;


import com.example.demo.entity.NhanVien;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Override
    public Page<NhanVien> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.findAll(pageable);
    }

    @Override
    public List<NhanVien> getAllByStatus() {
        return nhanVienRepository.getAllByStatus();
    }

    @Override
    public NhanVien getOne(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    @Override
    public NhanVien add(NhanVien nhanVien) {
        return nhanVienRepository.save(nhanVien);
    }

    @Override
    public NhanVien update(NhanVien nhanVien, UUID id) {
        if (nhanVienRepository.existsById(id)) {
            return nhanVienRepository.save(nhanVien);
        }
        return null;
    }

    @Override
    public void delete(UUID id) {nhanVienRepository.deleteById(id);
    }
}
