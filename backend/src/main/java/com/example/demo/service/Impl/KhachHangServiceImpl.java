package com.example.demo.service.Impl;

import com.example.demo.entity.HangKhachHang;
import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.repository.HangKhachHangRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    private KhachHangRepository khachHangRepository;
    @Autowired
    private HangKhachHangRepository hangKhachHangRepository;
    @Override
    public Page<KhachHang> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.getAll(pageable);
    }

    @Override
    public List<KhachHang> getListStatus() {
        return khachHangRepository.getListStatus();
    }

    @Override
    public KhachHang add(KhachHangRequest khachHangRequest) {
        KhachHang khachHang=KhachHang.builder()
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).ngaytao(khachHangRequest.getNgaytao()).hangKhachHang(hangKhachHangRepository.findById(khachHangRequest.getIdHangKhachHang()).get()).trangThai(Integer.valueOf(khachHangRequest.getTrangThai())).build();
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang update(KhachHangRequest khachHangRequest, UUID id) {
        KhachHang khachHang=KhachHang.builder().id(id)
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).ngaytao(khachHangRequest.getNgaytao()).hangKhachHang(hangKhachHangRepository.findById(khachHangRequest.getIdHangKhachHang()).get()).trangThai(Integer.valueOf(khachHangRequest.getTrangThai())).build();
        return khachHangRepository.save(khachHang);
    }

    @Override
    public KhachHang detail(UUID id) {
        return khachHangRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        khachHangRepository.deleteById(id);

    }
}
