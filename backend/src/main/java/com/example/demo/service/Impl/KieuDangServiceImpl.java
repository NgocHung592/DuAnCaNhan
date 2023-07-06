package com.example.demo.service.Impl;

import com.example.demo.entity.KieuDang;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.KieuDangRepository;
import com.example.demo.service.KieuDangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class KieuDangServiceImpl implements KieuDangService {

    @Autowired
    private KieuDangRepository kieuDangRepository;

    @Autowired
    private DanhMucRepository danhMucRepository;

    @Override
    public Page<KieuDang> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return kieuDangRepository.findAll(pageable);
    }

    @Override
    public KieuDang add(KieuDang kieuDang) {
        KieuDang kieuDangSave= KieuDang.builder()
                .ma(kieuDang.getMa())
                .ten(kieuDang.getTen())
                .danhMuc(danhMucRepository.findById(kieuDang.getDanhMuc().getId()).orElse(null))
                .trangThai(kieuDang.getTrangThai())
                .build();
        return kieuDangRepository.save(kieuDangSave);
    }

    @Override
    public KieuDang update(KieuDang kieuDang, UUID id) {
        if (kieuDangRepository.existsById(id)) {
            return kieuDangRepository.save(kieuDang);
        }
        return null;
    }

    @Override
    public KieuDang detail(UUID id) {
        return kieuDangRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        kieuDangRepository.deleteById(id);
    }
}
