package com.example.demo.repository;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDonChiTietId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, HoaDonChiTietId> {
}
