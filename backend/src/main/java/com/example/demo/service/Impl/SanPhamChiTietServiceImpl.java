package com.example.demo.service.Impl;

import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.SanPhamChiTietResponse;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;

    @Override
    public Page<SanPhamChiTietResponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return sanPhamChiTietRepository.getPage(pageable);
    }

//    @Override
//    public SanPhamChiTiet getOne(UUID id) {
//        return sanPhamChiTietRepository.findById(id).orElse(null);
//    }
//
//    @Override
//    public List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
//        List<SanPhamChiTiet> sanPhamChiTiets = new ArrayList<>();
////        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
////            SanPhamChiTiet sanPhamChiTietSave= SanPhamChiTiet
////                    .builder()
////                    .gia(sanPhamChiTietRequest.getGia())
////                    .build();
////            sanPhamChiTiets.add(sanPhamChiTietSave);
////        });
//
//        return sanPhamChiTietRepository.saveAll(sanPhamChiTiets);
//    }
//
//    @Override
//    public SanPhamChiTiet update(MauSac mauSac, UUID id) {
//        return null;
//    }
//
//    @Override
//    public void delete(UUID id) {
//
//    }
}
