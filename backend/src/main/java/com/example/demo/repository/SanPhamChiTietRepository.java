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
            select sp.id, sp.ten, sum(spct.so_luong) as 'so_luong', cl.ten, pc.ten, ht.ten, ta.ten, ca.ten, sp.da_xoa from san_pham_chi_tiet spct
            inner join chat_lieu cl on cl.id = spct.chat_lieu_id
            inner join phong_cach pc on pc.id = spct.phong_cach_id
            inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
            inner join san_pham sp on sp.id = spct.san_pham_id
            inner join tay_ao ta on ta.id = spct.tay_ao_id
            inner join co_ao ca on spct.co_ao_id = ca.id
            group by sp.id, sp.ten, cl.ten, pc.ten, ht.ten, ta.ten, ca.ten, sp.da_xoa
            order by a.ngay_tao desc
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable);

    @Query("select spct from SanPhamChiTiet spct where spct.sanPham.id=?1")
    Page<SanPhamChiTiet> getAllSanPhamChiTietById(UUID id, Pageable pageable);


}
