package com.example.demo.service.Impl;

import com.example.demo.entity.DanhMuc;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.KieuDangRepository;
import com.example.demo.service.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DanhMucServiceImpl implements DanhMucService {

    @Autowired
    private DanhMucRepository danhMucRepository;

    @Override
    public Page<DanhMuc> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return danhMucRepository.findAll(pageable);
    }

    @Override
    public List<DanhMuc> getListStatus() {
        return danhMucRepository.getListStatus();
    }

    @Override
    public DanhMuc getOne(UUID id) {
        return danhMucRepository.findById(id).orElse(null);
    }

    @Override
    public DanhMuc add(DanhMuc danhMuc) {
        return danhMucRepository.save(danhMuc);
    }

    @Override
    public DanhMuc update(DanhMuc danhMuc, UUID id) {
        if (danhMucRepository.existsById(id)) {
            danhMucRepository.save(danhMuc);
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        danhMucRepository.deleteById(id);
    }
}
