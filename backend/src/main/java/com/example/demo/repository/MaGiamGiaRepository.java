package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaGiamGiaRepository extends JpaRepository<MaGiamGia, UUID> {

    Optional<MaGiamGia> findMaGiamGiaByMa(String ma);
}
