package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.model.response.SanPhamReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaGiamGiaChiTietRepositioy extends JpaRepository<MaGiamGiaChiTiet, UUID> {

    @Query(value = """
            select * from ma_giam_gia_chi_tiet where ma_giam_gia_id=?1
            """, nativeQuery = true)
    Page<MaGiamGiaChiTiet> getPage(Pageable pageable, UUID id);

}
