package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.response.HoaDonResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonReponsitory extends JpaRepository<HoaDon, UUID> {

    @Query("select hd from HoaDon hd where hd.trangThai=0 order by hd.ngayTao desc ")
    List<HoaDon> getHoaDonCho();

    @Query(value = """
            select hd.id,
                    ma,
                    ten_khach_hang,
                    so_dien_thoai_khach_hang,
                    loai_hoa_don,
                    tong_tien,
                    ngay_tao,
                    trang_thai
            from hoa_don hd
            GROUP BY hd.id, ma, ten_khach_hang, so_dien_thoai_khach_hang, ngay_tao, loai_hoa_don, tong_tien, trang_thai
            ORDER BY ngay_tao DESC;            """, nativeQuery = true)
    Page<HoaDonResponse> getPage(Pageable pageable);

    @Query(value = """  
            select  hd.id, hd.ma, hd.ten_khach_hang, hd.loai_hoa_don, hd.tong_tien, hd.trang_thai, hd.ngay_dat_hang , hd.ngay_tao from  hoa_don hd  where
            hd.ma like %:search% or hd.ten_khach_hang like %:search% or hd.loai_hoa_don like %:search% or hd.tong_tien like %:search%
            order by hd.ngay_tao desc """, nativeQuery = true)
    Page<HoaDonResponse> searchByKeyword(Pageable pageable, @Param("search") String search);

    @Query(value = """
            select * from hoa_don hd
            where trang_thai = ?1
            ORDER BY hd.ngay_tao DESC;        
            """, nativeQuery = true)
    Page<HoaDonResponse> loc(Pageable pageable, String trangThai);
}
