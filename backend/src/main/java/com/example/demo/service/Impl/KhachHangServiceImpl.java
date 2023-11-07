package com.example.demo.service.Impl;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.UUID;
@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    private KhachHangRepository khachHangRepository;
    @Autowired
    private DiaChiRepository diaChiRepository;
    long currentTimestampMillis = System.currentTimeMillis();
    @Override
    public Page<KhachHangReponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 3);
        return khachHangRepository.getKhachHangAll(pageable);
    }

    @Override
    public Page<KhachHang> getKhachHangByTrangThai(Integer pageNo) {
        Pageable pageable=PageRequest.of(pageNo,10);
        return khachHangRepository.findAll(pageable);
    }

    @Override
    public DiaChi add(KhachHangRequest khachHangRequest) {
        KhachHang khachHang=KhachHang.builder()
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).matkhau(khachHangRequest.getMatkhau())
                .sodienthoai(khachHangRequest.getSodienthoai()).gioitinh(khachHangRequest.getGioitinh()).ngaysinh(khachHangRequest.getNgaysinh()).ngaytao(khachHangRequest.getNgaytao()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        KhachHang KhachHangg= khachHangRepository.save(khachHang);
        DiaChi diaChi=DiaChi.builder().khachHang(KhachHangg).tinhthanhpho(khachHangRequest.getTinhThanhPho())
                .phuongxa(khachHangRequest.getPhuongXa()).ngaytao(khachHangRequest.getNgaytao()).quanhuyen(khachHangRequest.getQuanHuyen())
                .mota(khachHangRequest.getMota()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        return diaChiRepository.save(diaChi);
    }

    @Override
    public DiaChi addid(KhachHangRequest khachHangRequest, UUID id) {
        KhachHang khachHang=KhachHang.builder().id(id).build();
        DiaChi diaChi=DiaChi.builder().khachHang(khachHang).tinhthanhpho(khachHangRequest.getTinhThanhPho())
                .phuongxa(khachHangRequest.getPhuongXa()).quanhuyen(khachHangRequest.getQuanHuyen())
                .mota(khachHangRequest.getMota()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).ngaytao(khachHangRequest.getNgaytao()).build();
        return diaChiRepository.save(diaChi);
    }

    @Override
    public Page<KhachHangReponse> getAllTrangThai(Integer pageNo, String tt) {
        return null;
    }

    @Override
    public DiaChi update(KhachHangRequest khachHangRequest, UUID id1,UUID id2) {
        KhachHang khachHang=KhachHang.builder().id(id2)
                .ma(khachHangRequest.getMa()).ngaysua(new Timestamp(currentTimestampMillis)).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).matkhau(khachHangRequest.getMatkhau())
                .sodienthoai(khachHangRequest.getSodienthoai()).gioitinh(khachHangRequest.getGioitinh()).ngaysinh(khachHangRequest.getNgaysinh()).ngaytao(khachHangRequest.getNgaytao()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        KhachHang KhachHangg= khachHangRepository.save(khachHang);
        DiaChi diaChi=DiaChi.builder().id(id1).khachHang(KhachHangg).tinhthanhpho(khachHangRequest.getTinhThanhPho())
                .phuongxa(khachHangRequest.getPhuongXa()).ngaytao(khachHangRequest.getNgaytao()).quanhuyen(khachHangRequest.getQuanHuyen())
                .mota(khachHangRequest.getMota()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        return diaChiRepository.save(diaChi);
    }

    @Override
    public Page<KhachHangReponse> getSearch(Integer pageNo, String serch) {
        return null;
    }

    @Override
    public DiaChi detail(UUID id) {
        return diaChiRepository.findById(id).orElse(null);

    }


}
