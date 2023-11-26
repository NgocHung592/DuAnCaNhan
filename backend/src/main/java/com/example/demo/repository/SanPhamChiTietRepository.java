package com.example.demo.repository;

import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.response.SanPhamChiTietResponse;
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
            select sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet', ta.ten as'ten_tay_ao', ca.ten as'ten_co_ao', spct.da_xoa from san_pham_chi_tiet spct
              inner join chat_lieu cl on cl.id = spct.chat_lieu_id
              inner join phong_cach pc on pc.id = spct.phong_cach_id
              inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
              inner join san_pham sp on sp.id = spct.san_pham_id
              inner join tay_ao ta on ta.id = spct.tay_ao_id
              inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
              inner join mau_sac ms on ms.id = spct.mau_sac_id
              inner join co_ao ca on spct.co_ao_id = ca.id
              where sp.id=?1
              group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, ta.ten, ca.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
              ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC; 
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getPage(Pageable pageable, UUID id);


    @Query(value = """
            select sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet' from san_pham_chi_tiet spct
              inner join chat_lieu cl on cl.id = spct.chat_lieu_id
              inner join phong_cach pc on pc.id = spct.phong_cach_id
              inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
              inner join san_pham sp on sp.id = spct.san_pham_id
              inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
              inner join mau_sac ms on ms.id = spct.mau_sac_id
              where spct.da_xoa='false'
              group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten,  spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
             ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC; 
            """, nativeQuery = true)
    Page<SanPhamChiTietResponse> getSanPhamBanHangTaiQuay(Pageable pageable);

    @Query(value = """
           select sp.id as'id_san_pham',spct.id as'id_san_pham_chi_tiet',hinh_anh ,sp.ten as'ten_san_pham', sum(spct.so_luong) as 'so_luong',spct.don_gia,kt.ten as'ten_kich_thuoc',ms.ten as'ten_mau_sac', cl.ten as'ten_chat_lieu', pc.ten as 'ten_phong_cach', ht.ten as'ten_hoa_tiet' from san_pham_chi_tiet spct
              inner join chat_lieu cl on cl.id = spct.chat_lieu_id
              inner join phong_cach pc on pc.id = spct.phong_cach_id
              inner join hoa_tiet ht on ht.id = spct.hoa_tiet_id
              inner join san_pham sp on sp.id = spct.san_pham_id
              inner join kich_thuoc kt on kt.id = spct.kich_thuoc_id
              inner join mau_sac ms on ms.id = spct.mau_sac_id
              where spct.da_xoa='false'
              group by sp.id,spct.id, sp.ten,kt.ten,ms.ten, cl.ten, pc.ten, ht.ten, spct.da_xoa,spct.ngay_tao,spct.don_gia,hinh_anh
             ORDER BY IIF(MAX(spct.ngay_sua) IS NULL, MAX(spct.ngay_tao), IIF(MAX(spct.ngay_tao) > MAX(spct.ngay_sua), MAX(spct.ngay_tao), MAX(spct.ngay_sua))) DESC; 
            """, nativeQuery = true)
    List<SanPhamChiTietResponse> getSanPhamTrangChu();

}
