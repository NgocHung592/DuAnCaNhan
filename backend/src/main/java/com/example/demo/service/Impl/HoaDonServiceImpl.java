package com.example.demo.service.Impl;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.response.HoaDonRepone;
import com.example.demo.repository.HoaDonReponsitory;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonServiceImpl implements HoaDonService{
    @Autowired
    private HoaDonReponsitory hoaDonReponsitory;
    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<HoaDon> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonReponsitory.findAll(pageable);
    }

    @Override
    public List<HoaDon> getList() {
        return hoaDonReponsitory.getHoaDonCho();
    }

    @Override
    public HoaDon add(HoaDon hoaDon) {
        HoaDon hoaDonSave= HoaDon.builder()
                .ma(hoaDon.getMa())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .trangThai(hoaDon.getTrangThai())
                .build();
        return hoaDonReponsitory.save(hoaDonSave);
    }

    @Override
    public HoaDon update(HoaDon hoaDon, UUID id) {
       Optional<HoaDon> optional=hoaDonReponsitory.findById(id);
        return optional.map(o->{
            o.setTrangThai(1);
            o.setTenKhachHang(hoaDon.getTenKhachHang());
            o.setDiaChiKhachHang(hoaDon.getDiaChiKhachHang());
            o.setSoDienThoaiKhachHang(hoaDon.getSoDienThoaiKhachHang());
            o.setNgayThanhToan(new Timestamp(currentTimestampMillis));
            o.setTongTien(hoaDon.getTongTien());
            return hoaDonReponsitory.save(o);
        }).orElse(null);
    }

    @Override
    public HoaDon detail(UUID id) {
        return hoaDonReponsitory.findById(id).orElse(null);
    }

    @Override
    public HoaDon delete(UUID id) {
        Optional<HoaDon> optional=hoaDonReponsitory.findById(id);

        return optional.map(hoaDon ->{
                    hoaDonReponsitory.delete(hoaDon);
                    return hoaDon;
                }).orElse(null);
    }

    @Override
    public List<HoaDon> getExcel() {
        return hoaDonReponsitory.findAll();
    }

    @Override
    public Page<HoaDonRepone> getAlll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaDonReponsitory.getPage(pageable);
    }
}
