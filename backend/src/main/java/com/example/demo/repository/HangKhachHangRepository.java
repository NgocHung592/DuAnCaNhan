package com.example.demo.repository;

import com.example.demo.entity.HangKhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HangKhachHangRepository extends JpaRepository<HangKhachHang, UUID> {

    @Query("select dm from HangKhachHang  dm where dm.trangThai=1")
    List<HangKhachHang> getListStatus();

}
