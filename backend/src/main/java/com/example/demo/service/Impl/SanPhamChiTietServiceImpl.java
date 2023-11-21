package com.example.demo.service.Impl;

import com.example.demo.entity.HinhAnh;
import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.SanPhamChiTietRequest;
import com.example.demo.model.request.UpdateSanPham;
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
import java.util.Optional;
import java.util.Random;
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

    @Override
    public Page<SanPhamChiTietResponse> getAll(Integer pageNo, UUID id) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.getPage(pageable, id);
    }



    @Override
    public Page<SanPhamChiTietResponse> getSanPhamBanHang(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamChiTietRepository.getSanPhamBanHangTaiQuay(pageable);
    }

    @Override
    public List<SanPhamChiTietResponse> getSanPhamTrangChu() {
        return sanPhamChiTietRepository.getSanPhamTrangChu();
    }

    @Override
    public SanPhamChiTiet getOne(UUID id) {
        return sanPhamChiTietRepository.findById(id).orElse(null);
    }

    @Override
    public List<SanPhamChiTiet> add(List<SanPhamChiTietRequest> sanPhamChiTietRequests) {
        sanPhamChiTietRequests.forEach(sanPhamChiTietRequest -> {
            if (sanPhamRepository.findByTen(sanPhamChiTietRequest.getTenSanPham()).isPresent()) {
                SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet.builder()
                        .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                        .donGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()))
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .ngayTao(sanPhamChiTietRequest.getNgayTao())
                        .nguoiTao("Hưng")
                        .urlImage(sanPhamChiTietRequest.getUrlImage())
                        .sanPham(sanPhamRepository.findById(getIdSanPham(sanPhamChiTietRequest.getTenSanPham())).get())
                        .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
                        .mauSac(mauSacRepository.findById(getIdMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
                        .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                        .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                        .coAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get())
                        .tayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get())
                        .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                        .build();
                sanPhamChiTietRepository.save(sanPhamChiTietSave);
                return;
            } else {
                SanPham sanPhamSave = SanPham.builder()
                        .ma(sanPhamChiTietRequest.getMaSanPham())
                        .ten(sanPhamChiTietRequest.getTenSanPham())
                        .moTa(sanPhamChiTietRequest.getMoTa())
                        .ngayTao(sanPhamChiTietRequest.getNgayTao())
                        .nguoiTao("Hưng")
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .build();
                SanPham sanPham = sanPhamRepository.save(sanPhamSave);

                SanPhamChiTiet sanPhamChiTietSave = SanPhamChiTiet.builder()
                        .daXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()))
                        .soLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()))
                        .donGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()))
                        .ngayTao(sanPhamChiTietRequest.getNgayTao())
                        .nguoiTao("Hưng")
                        .urlImage(sanPhamChiTietRequest.getUrlImage())
                        .sanPham(sanPham)
                        .kichThuoc(kichThuocRepository.findById(getIdKichThuoc(sanPhamChiTietRequest.getTenKichThuoc())).get())
                        .mauSac(mauSacRepository.findById(getIdMauSac(sanPhamChiTietRequest.getTenMauSac())).get())
                        .chatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get())
                        .phongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get())
                        .coAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get())
                        .tayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get())
                        .hoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get())
                        .build();
                sanPhamChiTietRepository.save(sanPhamChiTietSave);
                return;
            }
        });
        return null;
    }

    @Override
    public SanPhamChiTiet update(SanPhamChiTietRequest sanPhamChiTietRequest, UUID id) {
        Optional<SanPhamChiTiet> optional = sanPhamChiTietRepository.findById(id);
        optional.map(sanPhamChiTietUpdate -> {
            sanPhamChiTietUpdate.setSoLuong(Integer.valueOf(sanPhamChiTietRequest.getSoLuong()));
            sanPhamChiTietUpdate.setDonGia(BigDecimal.valueOf(sanPhamChiTietRequest.getDonGia()));
            sanPhamChiTietUpdate.setNgaySua(sanPhamChiTietRequest.getNgaySua());
            sanPhamChiTietUpdate.setNguoiSua("Nguyễn Ngọc Hưng");
            sanPhamChiTietUpdate.setUrlImage(sanPhamChiTietRequest.getUrlImage());
            sanPhamChiTietUpdate.setDaXoa(Boolean.valueOf(sanPhamChiTietRequest.getDaXoa()));
            sanPhamChiTietUpdate.setMauSac(mauSacRepository.findById(sanPhamChiTietRequest.getIdMauSac()).get());
            sanPhamChiTietUpdate.setKichThuoc(kichThuocRepository.findById(sanPhamChiTietRequest.getIdKichThuoc()).get());
            sanPhamChiTietUpdate.setChatLieu(chatLieuRepository.findById(sanPhamChiTietRequest.getIdChatLieu()).get());
            sanPhamChiTietUpdate.setPhongCach(phongCachRepository.findById(sanPhamChiTietRequest.getIdPhongCach()).get());
            sanPhamChiTietUpdate.setHoaTiet(hoaTietRepository.findById(sanPhamChiTietRequest.getIdHoaTiet()).get());
            sanPhamChiTietUpdate.setTayAo(tayAoRepository.findById(sanPhamChiTietRequest.getIdTayAo()).get());
            sanPhamChiTietUpdate.setCoAo(coAoRepository.findById(sanPhamChiTietRequest.getIdCoAo()).get());
            return sanPhamChiTietRepository.save(sanPhamChiTietUpdate);
        }).orElse(null);

        return null;
    }

    @Override
    public SanPhamChiTiet updateSoLuong(List<UpdateSanPham> updateSanPhams) {
        updateSanPhams.forEach(sanPham -> {
            Optional<SanPhamChiTiet> optional = sanPhamChiTietRepository.findById(sanPham.getIdSanPhamChiTiet());
            if (optional.isPresent()) {
                Integer soLuongNew = optional.get().getSoLuong() - sanPham.getSoLuong();
                if (soLuongNew == 0) {
                    optional.map(sanPhamChiTiet -> {
                        sanPhamChiTiet.setSoLuong(soLuongNew);
                        sanPhamChiTiet.setDaXoa(true);
                        return sanPhamChiTietRepository.save(sanPhamChiTiet);
                    }).orElse(null);
                }
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
