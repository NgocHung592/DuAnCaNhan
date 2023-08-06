package com.example.demo.repository;

import com.example.demo.entity.SanPham;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.SanPhamChiTietResponse;
import com.example.demo.service.SanPhamChiTietService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SanPhamChiTietRepository extends JpaRepository<SanPhamChiTiet, UUID> {

    @Query(value = """
               select a.id as id_san_pham_chi_tiet, b.ten as ten_san_pham,sum(c.so_luong) as so_luong,a.gia as gia,a.da_xoa as da_xoa from san_pham_chi_tiet a
               inner join san_pham b on a.san_pham_id=b.id
               inner join kich_thuoc_chi_tiet c on a.id=c.chi_tiet_san_pham_id
               group by a.id,b.ten,a.gia,a.da_xoa,a.ngay_tao
               order by a.ngay_tao desc 
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable);

    @Query("select spct from SanPhamChiTiet spct where spct.sanPham.id=?1")
    Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id, Pageable pageable);


}
