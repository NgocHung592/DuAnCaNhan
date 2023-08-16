package com.example.demo.repository;


import com.example.demo.entity.TaiKhoan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
public interface KhachHangRepository extends JpaRepository<TaiKhoan, UUID> {
//@Query("SELECT tai_khoan.id, tai_khoan.ho_ten,tai_khoan.ma,hang_khach_hang.ten,tai_khoan.trang_thai \n" +
//        "FROM tai_khoan, hang_khach_hang\n" +
//        "WHERE tai_khoan.hang_khach_hang=hang_khach_hang.id")
//List<KhachHang> getList();
    @Query("select kh from TaiKhoan kh where kh.vaiTro.ten LIKE 'Khách hàng' ")
    Page<TaiKhoan> getAll(Pageable pageable);

    @Query("select kd from TaiKhoan  kd where kd.trangthai=1")
    List<TaiKhoan> getListStatus();
    @Query("select kh from TaiKhoan  kh where kh.ma LIKE %:ma% and kh.hangKhachHang is not null ")
    Page<TaiKhoan> findByMaContainingIgnoreCase(Pageable pageable,@Param("ma")String ma);
    @Query("select kh from TaiKhoan  kh where kh.sodienthoai LIKE %:sodienthoai% and kh.hangKhachHang is not null ")
    Page<TaiKhoan> findBySodienthoaiContainingIgnoreCase(Pageable pageable,@Param("sodienthoai")String sdt);
    @Query("select kh from TaiKhoan  kh where kh.hoten LIKE %:ten% and kh.hangKhachHang is not null ")
    Page<TaiKhoan> findByTenContainingIgnoreCase(Pageable pageable,@Param("ten")String ten);
}
