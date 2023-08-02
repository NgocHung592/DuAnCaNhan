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
               SELECT a.id as id_san_pham, a.ten as ten_san_pham,c.anh_noi_bat as anh_noi_bat,sum(b.so_luong) as so_luong,
               min (b.gia) as gia_min,max (b.gia) as gia_max,a.mo_ta as mo_ta,a.da_xoa as trang_thai FROM san_pham a
               inner join san_pham_chi_tiet b on a.id=b.san_pham_id
               inner join hinh_anh c on c.chi_tiet_san_pham_id=b.id
               where b.da_xoa=0
               group by a.ten, a.mo_ta, a.da_xoa,c.anh_noi_bat,a.id
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable);

    @Query("select spct from SanPhamChiTiet spct where spct.sanPham.id=?1")
    Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id,Pageable pageable);


}
