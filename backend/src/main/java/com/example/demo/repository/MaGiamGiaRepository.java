package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
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
public interface MaGiamGiaRepository extends JpaRepository<MaGiamGia, UUID> {

    @Query(value = """
            select * from ma_giam_gia order by ngay_tao desc
                        """, nativeQuery = true)
    Page<MaGiamGia> getAll(Pageable pageable);

    @Query(value = """
            select * from ma_giam_gia where trang_thai=2 order by ngay_tao desc
                        """, nativeQuery = true)
    Page<MaGiamGia> getAllByStatus(Pageable pageable);

    Optional<MaGiamGia> findMaGiamGiaByMa(String ma);

    @Query(value = """
            select * from ma_giam_gia where trang_thai=?1  order by ngay_tao desc
              """, nativeQuery = true)
    Page<MaGiamGia> locMaGiamGia(Pageable pageable, Integer trangThai);


    @Query(value = """
            select * from ma_giam_gia where ma like %:key% or ten like %:key% order by ngay_tao desc
            """, nativeQuery = true)
    Page<MaGiamGia> searchMaGiamGia(Pageable pageable, @Param("key") String keyword);
}
