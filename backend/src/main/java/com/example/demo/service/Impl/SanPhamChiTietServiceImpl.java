package com.example.demo.service.Impl;

import com.example.demo.entity.HinhAnh;
import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.KichThuocMauSac;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.response.SanPhamChiTietResponse;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.repository.CoAoRepository;
import com.example.demo.repository.HinhAnhRepository;
import com.example.demo.repository.HoaTietRepository;
import com.example.demo.repository.KichThuocRepository;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.repository.PhongCachRepository;
import com.example.demo.repository.SanPhamChiTietRepository;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.repository.TayAoRepository;
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
    private KichThuocRepository kichThuocRepository;
    @Autowired
    private ChatLieuRepository chatLieuRepository;
    @Autowired
    private HoaTietRepository hoaTietRepository;
    @Autowired
    private MauSacRepository mauSacRepository;
    @Autowired
    private PhongCachRepository phongCachRepository;
    @Autowired
    private TayAoRepository tayAoRepository;
    @Autowired
    private CoAoRepository coAoRepository;
    @Autowired
    private HinhAnhRepository hinhAnhRepository;


    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<SanPhamChiTietResponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.getPage(pageable);
    }

    @Override
    public Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id, Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.getAllSanPhamChiTietById(id, pageable);
    }

    @Override
    public SanPhamChiTiet getOne(UUID id) {
        return sanPhamChiTietRepository.findById(id).get();
    }

    @Override
    public List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
            if (sanPhamRepository.findByTen(sanPhamChiTietRequest.getTenSanPham()).isPresent()) {
                SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet.builder()
                        .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                        .donGia(BigDecimal.valueOf(sanPhamChiTietRequest.getGiaBan()))
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .ngayTao(new Timestamp(currentTimestampMillis))
                        .nguoiTao("Hưng")
                        .sanPham(sanPhamRepository.findById(getIdSanPham(sanPhamChiTietRequest.getTenSanPham())).get())
                        .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
                        .mauSac(mauSacRepository.findById(getIdMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
                        .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                        .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                        .coAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get())
                        .tayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get())
                        .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                        .build();
                SanPhamChiTiet sanPhamChiTiet = sanPhamChiTietRepository.save(sanPhamChiTietSave);
                HinhAnh hinhAnhSave = HinhAnh.builder()
                        .duong_dan(sanPhamChiTietRequest.getUrlImage())
                        .ngayTao(new Timestamp(currentTimestampMillis))
                        .nguoiTao("Hưng")
                        .sanPhamChiTiet(sanPhamChiTiet)
                        .build();
                hinhAnhRepository.save(hinhAnhSave);
                return;
            } else {
                SanPham sanPhamSave = SanPham.builder()
                        .ma(sanPhamChiTietRequest.getMaSanPham())
                        .ten(sanPhamChiTietRequest.getTenSanPham())
                        .moTa(sanPhamChiTietRequest.getMoTa())
                        .ngayTao(new Timestamp(currentTimestampMillis))
                        .nguoiTao("Hưng")
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .build();
                SanPham sanPham = sanPhamRepository.save(sanPhamSave);

                SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet.builder()
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                        .donGia(BigDecimal.valueOf(sanPhamChiTietRequest.getGiaBan()))
                        .ngayTao(new Timestamp(currentTimestampMillis))
                        .nguoiTao("Hưng")
                        .sanPham(sanPham)
                        .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
                        .mauSac(mauSacRepository.findById(getIdMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
                        .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                        .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                        .coAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get())
                        .tayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get())
                        .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                        .build();
               SanPhamChiTiet sanPhamChiTiet= sanPhamChiTietRepository.save(sanPhamChiTietSave);

                HinhAnh hinhAnhSave = HinhAnh.builder()
                        .duong_dan(sanPhamChiTietRequest.getUrlImage())
                        .ngayTao(new Timestamp(currentTimestampMillis))
                        .nguoiTao("Hưng")
                        .sanPhamChiTiet(sanPhamChiTiet)
                        .build();
                hinhAnhRepository.save(hinhAnhSave);
                return;
            }
        });
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

    public UUID getIdKichThuoc(String ten) {
        for (KichThuoc kichThuoc : kichThuocRepository.findAll()) {
            if (ten.equals(kichThuoc.getTen())) {
                return kichThuoc.getId();
            }
        }
        return null;
    }

    public UUID getIdMauSac(String ten) {
        for (MauSac mauSac : mauSacRepository.findAll()) {
            if (ten.equals(mauSac.getTen())) {
                return mauSac.getId();
            }
        }
        return null;
    }

}
