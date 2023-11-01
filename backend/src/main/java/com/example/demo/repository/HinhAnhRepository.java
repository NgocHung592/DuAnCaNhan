package com.example.demo.repository;

import com.example.demo.entity.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface HinhAnhRepository extends JpaRepository<HinhAnh, UUID> {

    @Query("select ha from HinhAnh ha where ha.sanPhamChiTiet.id=?1 ")
    Optional<HinhAnh> findHinhAnh(UUID id);
}
