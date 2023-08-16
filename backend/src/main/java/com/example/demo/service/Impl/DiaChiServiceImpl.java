package com.example.demo.service.Impl;


import com.example.demo.entity.DiaChi;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.TaiKhoan;
import com.example.demo.model.request.DiaChiRequest;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    private DiaChiRepository diaChiRepository;
    @Autowired
    private KhachHangRepository khachHangRepository;
    @Override
    public Page<DiaChi> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return diaChiRepository.getPage(pageable);
    }
    @Override
    public DiaChi getOne(UUID id) {
        return diaChiRepository.findById(id).orElse(null);
    }

    @Override
    public DiaChi add(DiaChiRequest diaChiRequest) {
        DiaChi diaChi=DiaChi.builder().mota(diaChiRequest.getMota())
                .quanhuyen(diaChiRequest.getQuanHuyen()).ten(diaChiRequest.getTen())
                .phuongxa(diaChiRequest.getPhuongXa())
                .diachimacdinh(diaChiRequest.getDiaChiMacDinh())
                .tinhthanhpho(diaChiRequest.getTinhThanhPho())
                .taiKhoan(khachHangRepository.findById(diaChiRequest.getIdTaiKhoan()).get()).trangthai(Integer.valueOf(diaChiRequest.getTrangThai())).build();




        return diaChiRepository.save(diaChi);
    }

    @Override
    public DiaChi update(DiaChi diaChi, UUID id) {
        if (diaChiRepository.existsById(id)){
            return diaChiRepository.save(diaChi);
        }
        return null;
    }

//    @Override
//    public List<DiaChi> add(List<DiaChiRequest> diaChiRequests) {
//        List<DiaChi> diaChis=new ArrayList<>();
//        diaChiRequests.forEach(diaChiRequest -> {
//            DiaChi diaChi=DiaChi.builder().diachimacdinh(diaChiRequest.getDiaChiMacDinh())
//                    .mota(diaChiRequest.getMoTa()).quanhuyen(diaChiRequest.getQuanHuyen())
//                    .phuongxa(diaChiRequest.getPhuongXa()).tinhthanhpho(diaChiRequest.getTinhThanhPho())
//                    .taiKhoan(khachHangRepository.findById(getIdTaiKhoan(diaChiRequest.getHoTenTaiKhoan())).get()).build();
//        });
//        return null;
//    }
//    public UUID getIdTaiKhoan(String Hoten) {
//        for (TaiKhoan taiKhoan : khachHangRepository.findAll()) {
//            if (Hoten.equals(taiKhoan.getHoten())) {
//                return taiKhoan.getId();
//            }
//        }
//        return null;
//    }
    @Override
    public void delete(UUID id) {

        diaChiRepository.deleteById(id);

    }
}
