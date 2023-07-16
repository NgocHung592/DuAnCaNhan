package com.example.demo.service.Impl;

import com.example.demo.entity.PhongCach;
import com.example.demo.repository.PhongCachRepository;
import com.example.demo.service.PhongCachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PhongCachServiceImpl implements PhongCachService {

    @Autowired
    private PhongCachRepository phongCachRepository;

    @Override
    public Page<PhongCach> getAll(Integer pageNo) {
        Pageable pageable= PageRequest.of(pageNo,5);
        return phongCachRepository.findAll(pageable);
    }

    @Override
    public List<PhongCach> getAllByStatus() {
        return phongCachRepository.getAllByStatus();
    }

    @Override
    public PhongCach getOne(UUID id) {
        return phongCachRepository.findById(id).orElse(null);
    }

    @Override
    public PhongCach add(PhongCach phongCach) {
        return phongCachRepository.save(phongCach);
    }

    @Override
    public PhongCach update(PhongCach phongCach, UUID id) {
        if (phongCachRepository.existsById(id)) {
            phongCachRepository.save(phongCach);
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        phongCachRepository.deleteById(id);
    }
}
