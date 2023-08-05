package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DanhMuc;
import com.example.demo.entity.HoaTiet;
import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.PhongCach;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.response.SanPhamChiTietResponse;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.repository.DanhMucRepository;
import com.example.demo.repository.HoaTietRepository;
import com.example.demo.repository.KichThuocRepository;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.PhongCachRepository;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class SanPhamChiTietServiceImpl implements SanPhamChiTietService {

    @Autowired
    private SanPhamChiTietRepository sanPhamChiTietRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;
    @Autowired
    private DanhMucRepository danhMucRepository;
    @Autowired
    private KichThuocRepository kichThuocRepository;
    @Autowired
    private ChatLieuRepository chatLieuRepository;
    @Autowired
    private HoaTietRepository hoaTietRepository;
    @Autowired
    private MauSacRepository mauSacRepository;
    @Autowired
    private PhongCachRepository phongCachRepository;

    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<SanPhamChiTietResponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return sanPhamChiTietRepository.getPage(pageable);
    }

    @Override
    public Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.getAllSanPhamChiTietById(id, pageable);
    }

    @Override
    public List<SanPhamChiTiet> add(SanPhamChiTietRequest sanPhamChiTietRequest) {
//        List<SanPhamChiTiet> sanPhamChiTiets = new ArrayList<>();
//        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
//            SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet
//                    .builder()
//                    .gia(BigDecimal.valueOf(sanPhamChiTietRequest.getGia()))
//                    .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
//                    .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
//                    .ngayTao(new Timestamp(currentTimestampMillis))
//                    .sanPham(sanPhamRepository.findById(getIdSanPham(sanPhamChiTietRequest.getTenSanPham())).get())
//                    .danhMuc(danhMucRepository.findById(getIdDanhMuc(sanPhamChiTietRequest.getTenDanhMuc())).get())
//                    .hoaTiet(hoaTietRepository.findById(getIdHoaTiet(sanPhamChiTietRequest.getTenHoaTiet())).get())
//                    .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
//                    .mauSac(mauSacRepository.findById(getIdSMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
//                    .phongCach(phongCachRepository.findById(getIdPhongCach(sanPhamChiTietRequest.getTenPhongCach())).get())
//                    .chatLieu(chatLieuRepository.findById(getIdChatLieu(sanPhamChiTietRequest.getTenChatLieu())).get())
//                    .build();
//            sanPhamChiTiets.add(sanPhamChiTietSave);
//        });
//
//        return sanPhamChiTietRepository.saveAll(sanPhamChiTiets);
        return null;
    }

    public UUID getIdSanPham(String ten) {
        for (SanPham sanPham : sanPhamRepository.findAll()) {
            if (ten.equals(sanPham.getTen())) {
                return sanPham.getId();
            }
        }
        return null;
    }

    public UUID getIdDanhMuc(String ten) {
        for (DanhMuc danhMuc : danhMucRepository.findAll()) {
            if (ten.equals(danhMuc.getTen())) {
                return danhMuc.getId();
            }
        }
        return null;
    }

    public UUID getIdHoaTiet(String ten) {
        for (HoaTiet hoaTiet : hoaTietRepository.findAll()) {
            if (ten.equals(hoaTiet.getTen())) {
                return hoaTiet.getId();
            }
        }
        return null;
    }

    public UUID getIdKichThuoc(String ten) {
        for (KichThuoc kichThuoc : kichThuocRepository.findAll()) {
            if (ten.equals(kichThuoc.getTen())) {
                return kichThuoc.getId();
            }
        }
        return null;
    }

    public UUID getIdSMauSac(String ten) {
        for (MauSac mauSac : mauSacRepository.findAll()) {
            if (ten.equals(mauSac.getTen())) {
                return mauSac.getId();
            }
        }
        return null;
    }

    public UUID getIdPhongCach(String ten) {
        for (PhongCach phongCach : phongCachRepository.findAll()) {
            if (ten.equals(phongCach.getTen())) {
                return phongCach.getId();
            }
        }
        return null;
    }

    public UUID getIdChatLieu(String ten) {
        for (ChatLieu chatLieu : chatLieuRepository.findAll()) {
            if (ten.equals(chatLieu.getTen())) {
                return chatLieu.getId();
            }
        }
        return null;
    }
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
