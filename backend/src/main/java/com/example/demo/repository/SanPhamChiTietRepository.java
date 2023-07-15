package com.example.demo.repository;

import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.SanPhamChiTietResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, UUID> {

    @Query(value = """
            SELECT a.ten as ten,c.anh_noi_bat as anh_noi_bat,sum(b.so_luong) as so_luong,avg (b.gia) as gia,a.mo_ta as mo_ta,a.trang_thai as trang_thai FROM san_pham a
            			inner join san_pham_chi_tiet b on a.id=b.san_pham_id
            			inner join hinh_anh c on c.chi_tiet_san_pham_id=b.id
                        group by a.ten, a.mo_ta, a.trang_thai,c.anh_noi_bat
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable);
}
