package com.example.demo.service.Impl;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.repository.MaGiamGiaRepository;
import com.example.demo.service.MaGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.time.Instant;
import java.util.ResourceBundle;

import java.sql.Connection;

import java.sql.DriverManager;
import java.util.Optional;
import java.util.UUID;

@Service
public class MaGiamGiaServiceImpl implements MaGiamGiaService {

    @Autowired
    private MaGiamGiaRepository maGiamGiaRepository;


    @Override
    public Page<MaGiamGia> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<MaGiamGia> p = maGiamGiaRepository.getAll(pageable);
        return getMaGiamGias(p);
    }

    @Override
    public Page<MaGiamGia> getAllByStatus(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return maGiamGiaRepository.getAllByStatus(pageable);
    }

    @Override
    public MaGiamGia add(MaGiamGia maGiamGia) {
        return maGiamGiaRepository.save(maGiamGia);

    }

    @Override
    public MaGiamGia update(MaGiamGia maGiamGia, UUID id) {
        if (maGiamGiaRepository.existsById(id)) {
            return maGiamGiaRepository.save(maGiamGia);
        }
        return null;
    }

    @Override
    public MaGiamGia detail(UUID id) {
        MaGiamGia m = maGiamGiaRepository.findById(id).orElse(null);
//        java.sql.Timestamp timestamp = new java.sql.Timestamp(System.currentTimeMillis());
//        try {
//            if (m.getNgayBatDau().compareTo(timestamp) < 0) {
//                if (m.getNgayKetThuc().compareTo(timestamp) < 0) {
//                    if (m.getTrangThai() != 3) {
//                        m.setTrangThai(3);
//                        Connection conn = getConn();
//                        PreparedStatement ps = conn.prepareStatement("UPDATE [ma_giam_gia] SET [trang_thai] = 3 WHERE id = ?");
//                        ps.setObject(1, id);
//                        ps.executeUpdate();
//                        ps.close();
//                        conn.close();
//                    }
//                } else {
//                    if (m.getTrangThai() != 2) {
//                        m.setTrangThai(2);
//                        Connection conn = getConn();
//                        PreparedStatement ps = conn.prepareStatement("UPDATE [ma_giam_gia] SET [trang_thai] = 2 WHERE id = ?");
//                        ps.setObject(1, id);
//                        ps.executeUpdate();
//                        ps.close();
//                        conn.close();
//                    }
//                }
//            }
//        } catch (Exception e) {
//        }
        return m;
    }

    @Override
    public void delete(UUID id) {
        maGiamGiaRepository.deleteById(id);
    }

    @Override
    public Page<MaGiamGia> locMaGiamGia(Integer pageNo, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<MaGiamGia> p = maGiamGiaRepository.locMaGiamGia(pageable,trangThai);
        return getMaGiamGias(p);
    }

    private Page<MaGiamGia> getMaGiamGias(Page<MaGiamGia> maGiamGias) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        maGiamGias.forEach(maGiamGia -> {
            if (maGiamGia.getNgayBatDau().compareTo(timestamp) < 0) {
                if (maGiamGia.getNgayKetThuc().compareTo(timestamp) < 0) {
                    if (maGiamGia.getTrangThai() != 3) {
                        maGiamGia.setTrangThai(3);
                        maGiamGiaRepository.save(maGiamGia);
                    }
                } else {
                    if (maGiamGia.getTrangThai() != 2) {
                        maGiamGia.setTrangThai(2);
                      maGiamGiaRepository.save(maGiamGia);
                    }
                }
            }
        });
        return maGiamGias;
    }

    @Override
    public Page<MaGiamGia> searchMaGiamGia(Integer pageNo, String keyWord) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        Page<MaGiamGia> p = maGiamGiaRepository.searchMaGiamGia(pageable,keyWord);
        return getMaGiamGias(p);
    }


}
