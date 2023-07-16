package com.example.demo.service.Impl;

import com.example.demo.entity.KichThuoc;
import com.example.demo.repository.KichThuocRepository;
import com.example.demo.service.KichThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class KichThuocServiceImpl implements KichThuocService {

    @Autowired
    private KichThuocRepository kichThuocRepository;

    @Override
    public Page<KichThuoc> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return kichThuocRepository.findAll(pageable);
    }

    @Override
    public List<KichThuoc> getAllByStatus() {
        return kichThuocRepository.getAllByStatus();
    }

    @Override
    public KichThuoc add(KichThuoc kichThuoc) {
        return kichThuocRepository.save(kichThuoc);
    }

    @Override
    public KichThuoc update(KichThuoc kichThuoc, UUID id) {
        if (kichThuocRepository.existsById(id)) {
            return kichThuocRepository.save(kichThuoc);
        }
        return null;
    }

    @Override
    public KichThuoc detail(UUID id) {
        return kichThuocRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        kichThuocRepository.deleteById(id);
    }
}
