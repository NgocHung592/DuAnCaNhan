package com.example.demo.repository;

import com.example.demo.entity.HoaTiet;
import com.example.demo.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, UUID> {

    @Query("select sp from SanPham  sp where sp.daXoa=false")
    List<SanPham> getAllByStatus();

    @Query(value = """
            SELECT * FROM san_pham sp WHERE sp.ten LIKE %:#{#sanPham.ten}% 
            """, nativeQuery = true)
    List<SanPham> findByName(@Param("sanPham") SanPham sanPham);

    Optional<SanPham> findByTen(String ten);
}
