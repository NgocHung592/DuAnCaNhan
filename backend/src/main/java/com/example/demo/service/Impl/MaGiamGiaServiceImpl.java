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
        Page<MaGiamGia> p = maGiamGiaRepository.findAll(pageable);
        Date timestamp = new Date(System.currentTimeMillis());
        for (MaGiamGia m : p) {
            try {
                if(m.getNgayBatDau().getTime() < timestamp.getTime()) {
                    if(m.getNgayKetThuc().getTime() < timestamp.getTime()) {
                        if(m.getTrangThai() != 3) {
                            m.setTrangThai(3);
                            Connection conn = getConn();
                            PreparedStatement ps = conn.prepareStatement("UPDATE [ma_giam_gia] SET [trang_thai] = 3 WHERE id = ?");
                            ps.setObject(1, m.getId());
                            ps.executeUpdate();
                            ps.close();
                            conn.close();
                        }
                    } else {
                        if(m.getTrangThai() != 2) {
                            m.setTrangThai(2);
                            Connection conn = getConn();
                            PreparedStatement ps = conn.prepareStatement("UPDATE [ma_giam_gia] SET [trang_thai] = 2 WHERE id = ?");
                            ps.setObject(1, m.getId());
                            ps.executeUpdate();
                            ps.close();
                            conn.close();
                        }
                    }
                }
            } catch(Exception e) {}
        }
        return p;
    }

    @Override
    public MaGiamGia add(MaGiamGia maGiamGia) throws Exception {
        Optional<MaGiamGia> maGiamGiaOptional = maGiamGiaRepository.findMaGiamGiaByMa(maGiamGia.getMa());
        if (maGiamGiaOptional.isPresent()) {
            throw new Exception("Ma Giam Gia is already present!");
        }
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
        Date timestamp = new Date(System.currentTimeMillis());
        try {
            if(m.getNgayBatDau().getTime() < timestamp.getTime()) {
                if(m.getNgayKetThuc().getTime() < timestamp.getTime()) {
                    if(m.getTrangThai() != 3) {
                        m.setTrangThai(3);
                        Connection conn = getConn();
                        PreparedStatement ps = conn.prepareStatement("UPDATE [ma_giam_gia] SET [trang_thai] = 3 WHERE id = ?");
                        ps.setObject(1, id);
                        ps.executeUpdate();
                        ps.close();
                        conn.close();
                    }
                } else  {
                    if(m.getTrangThai() != 2) {
                        m.setTrangThai(2);
                        Connection conn = getConn();
                        PreparedStatement ps = conn.prepareStatement("UPDATE [ma_giam_gia] SET [trang_thai] = 2 WHERE id = ?");
                        ps.setObject(1, id);
                        ps.executeUpdate();
                        ps.close();
                        conn.close();
                    }
                }
            }
        } catch(Exception e) {}
        return m;
    }

    private Connection getConn() throws Exception {
        ResourceBundle rb = ResourceBundle.getBundle("application");
        String connectionString = rb.getString("spring.datasource.url");
        String driverName = rb.getString("spring.datasource.driverClassName");
        String username = rb.getString("spring.datasource.username");
        String password = rb.getString("spring.datasource.password");
        try {
            Class.forName(driverName);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        Connection conn = DriverManager.getConnection(connectionString, username, password);
        return conn;
    }

    //    @Override
//    public KhuyenMai delete(UUID id) {
//        return khuyenMaiRepository.deleteById(id);
//    }
}
