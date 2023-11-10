package com.example.demo.service.Impl;

import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.repository.MaGiamGiaChiTietRepositioy;
import com.example.demo.service.MaGiamGiaChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MaGiamGiaChiTietImpl implements MaGiamGiaChiTietService {
    @Autowired
    private MaGiamGiaChiTietRepositioy maGiamGiaChiTietRepositioy;


    @Override
    public Page<MaGiamGiaChiTiet> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return maGiamGiaChiTietRepositioy.findAll(pageable);
    }

    @Override
    public MaGiamGiaChiTiet add(MaGiamGiaChiTiet maGiamGiaChiTiet) throws Exception {

        return maGiamGiaChiTietRepositioy.save(maGiamGiaChiTiet);
    }

    @Override
    public MaGiamGiaChiTiet update(MaGiamGiaChiTiet maGiamGiaChiTiet, UUID id) {
        if (maGiamGiaChiTietRepositioy.existsById(id)) {
            return maGiamGiaChiTietRepositioy.save(maGiamGiaChiTiet);
        }
        return null;
    }

    @Override
    public MaGiamGiaChiTiet detail(UUID id) {

        return maGiamGiaChiTietRepositioy.findMaGiamGiaChiTietByMaGiamGia_Id(id).orElse(null);
    }
}
