package com.example.demo.repository;

import com.example.demo.entity.MaGiamGia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MaGiamGiaRepository extends JpaRepository<MaGiamGia, UUID> {

    @Query(value = """
            select * from ma_giam_gia order by ngay_tao desc
                        """, nativeQuery = true)
    Page<MaGiamGia> getAll(Pageable pageable);

    Optional<MaGiamGia> findMaGiamGiaByMa(String ma);
}
