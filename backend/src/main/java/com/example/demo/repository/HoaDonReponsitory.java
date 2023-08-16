package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonReponsitory extends JpaRepository<HoaDon , UUID> {

    @Query("select hd from HoaDon hd where hd.trangThai=0 order by hd.ngayTao desc ")
    List<HoaDon> getHoaDonCho();

}
