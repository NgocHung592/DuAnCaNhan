package com.example.demo.service.Impl;

import com.example.demo.entity.HangKhachHang;

import com.example.demo.entity.TaiKhoan;
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
    public Page<TaiKhoan> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.getAll(pageable);
    }

    @Override
    public List<TaiKhoan> getListStatus() {
        return khachHangRepository.getListStatus();
    }

    @Override
    public TaiKhoan add(KhachHangRequest khachHangRequest) {
        TaiKhoan khachHang=TaiKhoan.builder()
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).matkhau(khachHangRequest.getMatkhau()).sodienthoai(khachHangRequest.getSodienthoai()).ngaysinh(khachHangRequest.getNgaysinh()).ngaytao(khachHangRequest.getNgaytao()).hangKhachHang(hangKhachHangRepository.findById(khachHangRequest.getIdHangKhachHang()).get()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        return khachHangRepository.save(khachHang);
    }

    @Override
    public TaiKhoan update(KhachHangRequest khachHangRequest, UUID id) {
        TaiKhoan khachHang=TaiKhoan.builder().id(id)
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).matkhau(khachHangRequest.getMatkhau()).sodienthoai(khachHangRequest.getSodienthoai()).ngaysinh(khachHangRequest.getNgaysinh()).ngaytao(khachHangRequest.getNgaytao()).hangKhachHang(hangKhachHangRepository.findById(khachHangRequest.getIdHangKhachHang()).get()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        return khachHangRepository.save(khachHang);
    }

    @Override
    public TaiKhoan detail(UUID id) {
        return khachHangRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        khachHangRepository.deleteById(id);

    }
    @Override
    public Page<TaiKhoan> getten(String ma, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.findByMaContainingIgnoreCase(pageable,ma);
    }

    @Override
    public Page<TaiKhoan> gettenn(String sdt, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.findBySodienthoaiContainingIgnoreCase(pageable,sdt);
    }

    @Override
    public Page<TaiKhoan> gettennt(String ten, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.findByTenContainingIgnoreCase(pageable,ten);
    }
}
