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
              select c.id as id_san_pham_chi_tiet,e.anh_noi_bat as anh_noi_bat,b.ten as ten_san_pham,d.ten as ten_mau_sac,g.ten as ten_kich_thuoc,c.gia as don_gia,c.so_luong as so_luong,a.da_xoa as da_xoa from san_pham_chi_tiet a
              inner join san_pham b on a.san_pham_id=b.id
              inner join kich_thuoc_mau_sac c on a.id=c.chi_tiet_san_pham_id
              inner join mau_sac d on c.mau_sac_id=d.id
              inner join kich_thuoc g on g.id=c.kich_thuoc_id
              inner join hinh_anh e on e.chi_tiet_san_pham_id=a.id
              where c.da_xoa=0
              group by c.id,b.ten,a.da_xoa,a.ngay_tao ,c.gia,d.ten,c.so_luong,e.anh_noi_bat,g.ten
              order by a.ngay_tao desc
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable);

    @Query("select spct from SanPhamChiTiet spct where spct.sanPham.id=?1")
    Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id, Pageable pageable);


}
