package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.HoaDonResponse;
import com.example.demo.repository.HoaDonReponsitory;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public List<HoaDon> getHoaDonCho() {
        return hoaDonReponsitory.getHoaDonCho();
    }

    @Override
    public HoaDon add(HoaDon hoaDon) {
        HoaDon hoaDonSave = HoaDon.builder()
                .ma(hoaDon.getMa())
                .ngayTao(hoaDon.getNgayTao())
                .loaiHoaDon("Tại quầy")
                .nguoiTao("Hưng")
                .trangThai(hoaDon.getTrangThai())
                .build();
        return hoaDonReponsitory.save(hoaDonSave);
    }

    @Override
    public HoaDon update(HoaDonRequest hoaDonRequest, UUID id) {
        Optional<HoaDon> optional = hoaDonReponsitory.findById(id);
        if (hoaDonRequest.getIdKhachHang() == null) {
            optional.map(hoaDon -> {
                hoaDon.setTrangThai(Integer.valueOf(hoaDonRequest.getTrangThai()));
                hoaDon.setTenKhachHang(hoaDonRequest.getTenKhachHang());
                hoaDon.setSoDienThoaiKhachHang(hoaDonRequest.getSoDienThoaiKhachHang());
                hoaDon.setDiaChiKhachHang(hoaDonRequest.getDiaChiKhachHang());
                hoaDon.setNgayThanhToan(hoaDonRequest.getNgayThanhToan());
                hoaDon.setTongTien(BigDecimal.valueOf(hoaDonRequest.getTongTien()));
                return hoaDonReponsitory.save(hoaDon);
            }).orElse(null);
        } else {
            optional.map(hoaDon -> {
                hoaDon.setTrangThai(Integer.valueOf(hoaDonRequest.getTrangThai()));
                hoaDon.setTenKhachHang(hoaDonRequest.getTenKhachHang());
                hoaDon.setSoDienThoaiKhachHang(hoaDonRequest.getSoDienThoaiKhachHang());
                hoaDon.setDiaChiKhachHang(hoaDonRequest.getDiaChiKhachHang());
                hoaDon.setNgayThanhToan(hoaDonRequest.getNgayThanhToan());
                hoaDon.setTongTien(BigDecimal.valueOf(hoaDonRequest.getTongTien()));
                hoaDon.setKhachHang(khachHangRepository.findById(hoaDonRequest.getIdKhachHang()).orElse(null));
                return hoaDonReponsitory.save(hoaDon);
            }).orElse(null);
        }
        return null;
    }


    @Override
    public HoaDon detail(UUID id) {
        return hoaDonReponsitory.findById(id).orElse(null);
    }

    @Override
    public Page<HoaDonResponse> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return hoaDonReponsitory.getPage(pageable);
    }

    @Override
    public Page<HoaDonResponse> search(Integer pageNo, String search) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonReponsitory.searchByKeyword(pageable, search);
    }

    @Override
    public Page<HoaDonResponse> loc(Integer pageNo, String trangThai) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return hoaDonReponsitory.loc(pageable, trangThai);
    }
}
