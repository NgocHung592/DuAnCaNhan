package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.entity.MaGiamGiaChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaGiamGiaChiTietRepositioy extends JpaRepository<MaGiamGiaChiTiet, UUID> {
    Optional<MaGiamGiaChiTiet> findMaGiamGiaChiTietByMaGiamGia_Id(UUID id);
}
