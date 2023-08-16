package com.example.demo.repository;


import com.example.demo.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NhanVienRepository extends JpaRepository<TaiKhoan, UUID> {


    @Query("select kd from TaiKhoan kd where kd.vaiTro.ten LIKE 'Nhân Viên' ")
    Page<TaiKhoan> getAll(Pageable pageable);
    @Query("select nv from TaiKhoan  nv where nv.trangthai = 1 and nv.vaiTro is not null")
    Page<TaiKhoan> getAllByStatus(Pageable pageable);
    @Query("select nv from TaiKhoan  nv where nv.trangthai = 1 and nv.vaiTro is not null ")
    List<TaiKhoan> findByTrangthai(Integer trangthai);
    @Query("select nv from TaiKhoan  nv where nv.ma LIKE %:ma% and nv.vaiTro is not null ")
    Page<TaiKhoan> findByMaContainingIgnoreCase(Pageable pageable,@Param("ma")String ma);
    @Query("select nv from TaiKhoan  nv where nv.sodienthoai LIKE %:sodienthoai% and nv.vaiTro is not null ")
    Page<TaiKhoan> findBySodienthoaiContainingIgnoreCase(Pageable pageable,@Param("sodienthoai")String sdt);
    @Query("select nv from TaiKhoan  nv where nv.hoten LIKE %:ten% and nv.vaiTro is not null ")
    Page<TaiKhoan> findByTenContainingIgnoreCase(Pageable pageable,@Param("ten")String ten);

}
