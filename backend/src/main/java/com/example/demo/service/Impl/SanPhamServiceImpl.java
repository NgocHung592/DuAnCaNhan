package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.SanPham;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<SanPham> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return sanPhamRepository.findAll(pageable);
    }

    @Override
    public List<SanPham> getAllByStatus() {
        return sanPhamRepository.getAllByStatus();
    }

    @Override
    public List<SanPham> findByName(SanPham sanPham) {
        return sanPhamRepository.findByName(sanPham);
    }

    @Override
    public SanPham add(SanPham sanPham) {
        if (sanPham.getMa().isBlank() || sanPham.getTen().isBlank() || sanPham.getMoTa().isBlank()) {
            return null;
        }
        SanPham sanPhamSave = SanPham.builder()
                .ma(sanPham.getMa())
                .ten(sanPham.getTen())
                .moTa(sanPham.getMoTa())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .daXoa(sanPham.getDaXoa())
                .build();
        return sanPhamRepository.save(sanPhamSave);
    }

    @Override
    public SanPham update(SanPham sanPham, UUID id) {
        if (sanPham.getMa().isBlank() || sanPham.getTen().isBlank() || sanPham.getMoTa().isBlank()) {
            return null;
        }
        SanPham sanPhamUpdate = SanPham.builder()
                .id(id)
                .ma(sanPham.getMa())
                .ten(sanPham.getTen())
                .moTa(sanPham.getMoTa())
                .ngaySua(new Timestamp(currentTimestampMillis))
                .ngaySua(null)
                .daXoa(sanPham.getDaXoa())
                .build();
        return sanPhamRepository.save(sanPhamUpdate);
    }

    @Override
    public SanPham detail(UUID id) {
        return sanPhamRepository.findById(id).get();
    }

    @Override
    public void delete(UUID id) {
        sanPhamRepository.deleteById(id);
    }
}
