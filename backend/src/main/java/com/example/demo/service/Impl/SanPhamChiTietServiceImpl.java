//package com.example.demo.service.Impl;
//
//import com.example.demo.entity.MauSac;
//import com.example.demo.entity.SanPhamChiTiet;
//import com.example.demo.model.request.SanPhamChiTietRequest;
//import com.example.demo.repository.SanPhamChiTietRepository;
//import com.example.demo.service.SanPhamChiTietService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//import java.util.stream.Collector;
//import java.util.stream.Collectors;
//
//public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {
//@Autowired
//private SanPhamChiTietRepository sanPhamChiTietRepository;
//
//    @Override
//    public Page<SanPhamChiTiet> getAll(Integer pageNo) {
//        return null;
//    }
//
//    @Override
//    public SanPhamChiTiet getOne(UUID id) {
//        return null;
//    }
//
//    @Override
//    public List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
//        List<SanPhamChiTiet> sanPhamChiTiets= new ArrayList<>();
//        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
//            SanPhamChiTiet sanPhamChiTietSave= SanPhamChiTiet
//                    .builder()
//                    .gia(sanPhamChiTietRequest.getGia())
//                    .build();
//            sanPhamChiTiets.add(sanPhamChiTietSave);
//        });
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
//}
