package com.example.demo.service.Impl;

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


//    @Override
//    public SanPhamChiTiet getOne(UUID id) {
//        return sanPhamChiTietRepository.findById(id).orElse(null);
//    }

    @Override
    public List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
        List<SanPhamChiTiet> sanPhamChiTiets = new ArrayList<>();
        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
            SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet
                    .builder()
                    .gia(BigDecimal.valueOf(sanPhamChiTietRequest.getGia()))
                    .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                    .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                    .sanPham(sanPhamRepository.findById(sanPhamChiTietRequest.getIdSanPham()).get())
                    .danhMuc(danhMucRepository.findById(sanPhamChiTietRequest.getIdDanhMuc()).get())
                    .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                    .kichThuoc(kichThuocRepository.findById(sanPhamChiTietRequest.getIdKichThuoc()).get())
                    .mauSac(mauSacRepository.findById(sanPhamChiTietRequest.getIdMauSac()).get())
                    .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                    .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                    .build();
            sanPhamChiTiets.add(sanPhamChiTietSave);
        });

        return sanPhamChiTietRepository.saveAll(sanPhamChiTiets);
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
