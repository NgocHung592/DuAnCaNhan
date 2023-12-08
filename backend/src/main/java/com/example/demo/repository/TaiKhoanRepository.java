package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface TaiKhoanRepository extends JpaRepository<KhachHang, UUID> {
    KhachHang findByEmail(String email);
    Optional<KhachHang> findKhachHangByEmail(String email);
    Optional<KhachHang> findByResetToken(String resetToken);


}
