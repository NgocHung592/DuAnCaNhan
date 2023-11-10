package com.example.demo.service.Impl;

import com.example.demo.entity.ChucVu;
import com.example.demo.entity.NhanVien;
import com.example.demo.model.response.NhanVienReponse;
import com.example.demo.model.request.NhanVienRequest;
import com.example.demo.repository.ChucVuRepository;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.service.NhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

import java.util.List;
import java.util.UUID;
@Service
public class NhanVienServiceImpl implements NhanVienService {
    @Autowired
    private ChucVuRepository chucVuRepository;
    @Autowired
    private NhanVienRepository nhanVienRepository;
    long currentTimestampMillis = System.currentTimeMillis();
    @Override
    public Page<NhanVienReponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.getNhanVienAll(pageable);
    }

    @Override
    public Page<NhanVienReponse> getAllTrangThai(Integer pageNo,String tt) {
        Pageable pageable = PageRequest.of(pageNo, 100);
        return nhanVienRepository.getNhanVienTrangThai1(pageable,tt);
    }


    @Override
    public NhanVien add(NhanVienRequest nhanVienRequest) {
        NhanVien nhanVien=NhanVien.builder().chucVu(chucVuRepository.findById(getId(nhanVienRequest.getChucVu())).get())
                .ma(nhanVienRequest.getMa())
                .hoten(nhanVienRequest.getHoten())
                .email(nhanVienRequest.getEmail())
                .matkhau(nhanVienRequest.getMatkhau())
                .sodienthoai(nhanVienRequest.getSodienthoai())
                .gioitinh(nhanVienRequest.getGioitinh())
                .ngaysinh(nhanVienRequest.getNgaysinh())
                .trangthai(Integer.valueOf(nhanVienRequest.getTrangthai()))
                .anhdaidien(nhanVienRequest.getAnhdaidien())
                .ngaytao(nhanVienRequest.getNgaytao())
                .mota(nhanVienRequest.getMota())
                .phuongxa(nhanVienRequest.getPhuongxa())
                .quanhuyen(nhanVienRequest.getQuanhuyen())
                .tinhthanhpho((nhanVienRequest.getTinhthanhpho()))
                .build();
        return nhanVienRepository.save(nhanVien);
    }


    @Override
    public NhanVien update(NhanVienRequest nhanVienRequest, UUID id) {
        NhanVien nhanVien=NhanVien.builder().id(id)
                .ma(nhanVienRequest.getMa())
                .hoten(nhanVienRequest.getHoten())
                .chucVu(chucVuRepository.findById(getId(nhanVienRequest.getChucVu())).get())
                .ngaytao(nhanVienRequest.getNgaytao())
                .email(nhanVienRequest.getEmail())
                .matkhau(nhanVienRequest.getMatkhau())
                .sodienthoai(nhanVienRequest.getSodienthoai())
                .gioitinh(nhanVienRequest.getGioitinh())
                .ngaysinh(nhanVienRequest.getNgaysinh())
                .trangthai(Integer.valueOf(nhanVienRequest.getTrangthai()))
                .anhdaidien(nhanVienRequest.getAnhdaidien())
                .ngaysua(nhanVienRequest.getNgaysua())
                .mota(nhanVienRequest.getMota())
                .phuongxa(nhanVienRequest.getPhuongxa())
                .quanhuyen(nhanVienRequest.getQuanhuyen())
                .tinhthanhpho((nhanVienRequest.getTinhthanhpho()))
                .build();
        return nhanVienRepository.save(nhanVien);

    }

    @Override
    public Page<NhanVienReponse> getSearch( Integer pageNo,String seach) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return nhanVienRepository.searchByKeyword(pageable,seach);
    }

    @Override
    public NhanVien detail(UUID id) {
        return nhanVienRepository.findById(id).orElse(null);
    }

    public UUID getId(String ten){
        for (ChucVu chucVu : chucVuRepository.findAll()) {
            if (ten.equals(chucVu.getTen())) {
                return chucVu.getId();
            }
        }
        return null;


    }

}
