package com.example.demo.service.Impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.SanPham;
import com.example.demo.model.response.SanPhamReponse;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository sanPhamRepository;

    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<SanPhamReponse> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return sanPhamRepository.getAll(pageable);
    }

    @Override
    public List<SanPham> getAllByStatus() {
        return sanPhamRepository.getAllByStatus();
    }

    @Override
    public Optional<SanPham> findbyName(String name) {
        return sanPhamRepository.findByTen(name);
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
        Optional<SanPham> optional=sanPhamRepository.findById(id);
        if (optional.isPresent()){
            optional.map(sanPhamUpdate->{
                sanPhamUpdate.setTen(sanPham.getTen());
                sanPhamUpdate.setMoTa(sanPham.getMoTa());
                sanPhamUpdate.setDaXoa(sanPham.getDaXoa());
                sanPhamUpdate.setNgaySua(new Timestamp(currentTimestampMillis));
                sanPhamUpdate.setNguoiSua("Nguyễn Ngọc Hưng");
                return sanPhamRepository.save(sanPhamUpdate);
            }).orElse(null);
        }
       return null;
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
