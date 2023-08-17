package com.example.demo.service.Impl;

import com.example.demo.entity.*;

import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.model.response.TaiKhoanReponse;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.HangKhachHangRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.repository.VaiTroRepository;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    private KhachHangRepository khachHangRepository;
    @Autowired
    private DiaChiRepository diaChiRepository;
    @Autowired
    private VaiTroRepository vaiTroRepository;
    @Autowired
    private HangKhachHangRepository hangKhachHangRepository;

    long currentTimestampMillis = System.currentTimeMillis();
    @Override
    public Page<TaiKhoanReponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return khachHangRepository.getAll(pageable);
    }

    @Override
    public List<TaiKhoan> getListStatus() {
        return khachHangRepository.getListStatus();
    }

    @Override
    public DiaChi add(KhachHangRequest khachHangRequest) {
        TaiKhoan khachHang=TaiKhoan.builder().vaiTro(vaiTroRepository.findById(getId(khachHangRequest.getIdVaiTro())).get())
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).matkhau(khachHangRequest.getMatkhau())
                .sodienthoai(khachHangRequest.getSodienthoai()).ngaysinh(khachHangRequest
                        .getNgaysinh()).ngaytao(new Timestamp(currentTimestampMillis)).hangKhachHang(hangKhachHangRepository.findById(getIdHang(khachHangRequest.getIdHangKhachHang())).get()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
        TaiKhoan KhachHangg= khachHangRepository.save(khachHang);
        DiaChi diaChi=DiaChi.builder().taiKhoan(KhachHangg).tinhthanhpho(khachHangRequest.getTinhThanhPho())
                .phuongxa(khachHangRequest.getPhuongXa()).quanhuyen(khachHangRequest.getQuanHuyen())
                .mota(khachHangRequest.getMota()).build();
        return diaChiRepository.save(diaChi);
    }
    public UUID getIdHang(String ten){
        for (HangKhachHang hangKhachHang : hangKhachHangRepository.findAll()) {
            if (ten.equals(hangKhachHang.getTen())) {
                return hangKhachHang.getId();
            }
        }
        return null;


    }
    public UUID getId(String ten){
        for (VaiTro vaiTro : vaiTroRepository.findAll()) {
            if (ten.equals(vaiTro.getTen())) {
                return vaiTro.getId();
            }
        }
        return null;


    }

    @Override
    public TaiKhoan update(KhachHangRequest khachHangRequest, UUID id) {
        TaiKhoan khachHang=TaiKhoan.builder().id(id)
                .ma(khachHangRequest.getMa()).hoten(khachHangRequest.getTen())
                .email(khachHangRequest.getEmail()).matkhau(khachHangRequest.getMatkhau()).sodienthoai(khachHangRequest.getSodienthoai()).ngaysinh(khachHangRequest.getNgaysinh()).ngaytao(new Timestamp(currentTimestampMillis)).hangKhachHang(hangKhachHangRepository.findById(getIdHang(khachHangRequest.getIdHangKhachHang())).get()).trangthai(Integer.valueOf(khachHangRequest.getTrangthai())).build();
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
