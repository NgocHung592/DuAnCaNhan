package com.example.demo.service.Impl;

import com.example.demo.entity.KieuDang;
import com.example.demo.model.request.KieuDangRequest;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.KieuDangRepository;
import com.example.demo.service.KieuDangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<KieuDang> getListStatus() {
        return kieuDangRepository.getListStatus();
    }

    @Override
    public KieuDang add(KieuDangRequest kieuDangRequest) {
        KieuDang kieuDangSave= KieuDang.builder()
                .ma(kieuDangRequest.getMa())
                .ten(kieuDangRequest.getTen())
                .danhMuc(danhMucRepository.findById(kieuDangRequest.getIdDanhMuc()).get())
                .daXoa(Boolean.valueOf(kieuDangRequest.getDaXoa()))
                .build();
        return kieuDangRepository.save(kieuDangSave);
    }

    @Override
    public KieuDang update(KieuDangRequest kieuDangRequest, UUID id) {
        KieuDang kieuDangUpdate= KieuDang.builder()
                .id(id)
                .ma(kieuDangRequest.getMa())
                .ten(kieuDangRequest.getTen())
                .danhMuc(danhMucRepository.findById(kieuDangRequest.getIdDanhMuc()).get())
                .daXoa(Boolean.valueOf(kieuDangRequest.getDaXoa()))
                .build();
        return kieuDangRepository.save(kieuDangUpdate);
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
