package com.example.demo.service.Impl;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.repository.MaGiamGiaRepository;
import com.example.demo.service.MaGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class MaGiamGiaServiceImpl implements MaGiamGiaService {

    @Autowired
    private MaGiamGiaRepository maGiamGiaRepository;


    @Override
    public Page<MaGiamGia> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return maGiamGiaRepository.findAll(pageable);
    }

    @Override
    public MaGiamGia add(MaGiamGia maGiamGia) throws Exception {
        Optional<MaGiamGia> maGiamGiaOptional = maGiamGiaRepository.findMaGiamGiaByMa(maGiamGia.getMa());
        if (maGiamGiaOptional.isPresent()) {
            throw new Exception("Ma Giam Gia is already present!");
        }
        return maGiamGiaRepository.save(maGiamGia);
    }

    @Override
    public MaGiamGia update(MaGiamGia maGiamGia, UUID id) {
        if (maGiamGiaRepository.existsById(id)) {
            return maGiamGiaRepository.save(maGiamGia);
        }
        return null;
    }

    @Override
    public MaGiamGia detail(UUID id) {
        return maGiamGiaRepository.findById(id).orElse(null);
    }

    //    @Override
//    public KhuyenMai delete(UUID id) {
//        return khuyenMaiRepository.deleteById(id);
//    }
}
