package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.response.KhachHangReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, UUID> {

    Optional<KhachHang> findKhachHangByEmail(String email);

    Optional<KhachHang> findKhachHangBySoDienThoai(String sdt);

    @Query(value = """  
            select * from khach_hang
            group by id, ma, anh_dai_dien, ho_ten, email, so_dien_thoai, gioi_tinh, ngay_sinh,mat_khau, da_xoa, ngay_tao,nguoi_tao,nguoi_sua,ngay_sua
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao),
                         IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;
            """, nativeQuery = true)
    Page<KhachHang> getALl(Pageable pageable);

    @Query(value = """  
              select kh.id,
                      kh.ho_ten,
                      kh.ngay_sinh,
                      kh.gioi_tinh,
                      kh.anh_dai_dien,
                      kh.so_dien_thoai,
                      kh.email,
                      kh.da_xoa,
                      dc.dia_chi_cu_the,
                      dc.phuong_xa,
                      dc.quan_huyen,
                      dc.tinh_thanh_pho
              from khach_hang kh
                  inner join dia_chi dc on kh.id = dc.khach_hang_id
              where kh.id = ?1
            """, nativeQuery = true)
    List<KhachHangReponse> detailKhachHang(UUID idKhachHang);

    @Query(value = """
            select * from khach_hang
            where da_xoa = ?1
            group by id, ma, anh_dai_dien, ho_ten, email, so_dien_thoai, gioi_tinh, ngay_sinh, mat_khau, da_xoa, ngay_tao,
                     nguoi_tao, nguoi_sua, ngay_sua
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao),
                         IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;        
            """, nativeQuery = true)
    Page<KhachHang> loc(Pageable pageable, String trangThai);

    @Query(value = """
           SELECT *
            FROM khach_hang
            WHERE ma LIKE %:key%
            OR ho_ten LIKE %:key%
            OR email LIKE %:key%
            OR so_dien_thoai LIKE %:key%
            GROUP BY id, ma, anh_dai_dien, ho_ten, email, so_dien_thoai, gioi_tinh, ngay_sinh, mat_khau, da_xoa, ngay_tao,
            nguoi_tao, nguoi_sua, ngay_sua
            ORDER BY IIF(MAX(ngay_sua) IS NULL, MAX(ngay_tao),
            IIF(MAX(ngay_tao) > MAX(ngay_sua), MAX(ngay_tao), MAX(ngay_sua))) DESC;
                                """, nativeQuery = true)
    Page<KhachHang> searchByKeyword(Pageable pageable, @Param("key") String keyWord);


}
