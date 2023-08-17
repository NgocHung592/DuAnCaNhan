package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.response.HoaDonRepone;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonReponsitory extends JpaRepository<HoaDon , UUID> {

    @Query("select hd from HoaDon hd where hd.trangThai=0 order by hd.ngayTao desc ")
    List<HoaDon> getHoaDonCho();

    @Query(value = """
             SELECT dbo.lich_su_hoa_don.loai_hoa_don, dbo.hoa_don.*
             FROM     dbo.hoa_don INNER JOIN
                               dbo.lich_su_hoa_don ON dbo.hoa_don.id = dbo.lich_su_hoa_don.hoa_don_id order by dbo.hoa_don.ngay_tao desc
            """, nativeQuery = true)
    Page<HoaDonRepone> getPage(Pageable pageable);
}
