package com.example.demo.service.Impl;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.repository.KhuyenMaiRepository;
import com.example.demo.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;


    @Override
    public Page<KhuyenMai> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khuyenMaiRepository.findAll(pageable);
    }

    @Override
    public KhuyenMai add(KhuyenMai khuyenMai) {
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public KhuyenMai update(KhuyenMai khuyenMai, UUID id) {
        if (khuyenMaiRepository.existsById(id)){
            return khuyenMaiRepository.save(khuyenMai);
        }
        return null;
    }

    @Override
    public KhuyenMai detail(UUID id) {
        return khuyenMaiRepository.findById(id).orElse(null);
    }

    //    @Override
//    public KhuyenMai delete(UUID id) {
//        return khuyenMaiRepository.deleteById(id);
//    }
}
