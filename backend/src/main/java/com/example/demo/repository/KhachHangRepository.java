package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
public interface KhachHangRepository extends JpaRepository<KhachHang, UUID> {
//@Query("SELECT tai_khoan.id, tai_khoan.ho_ten,tai_khoan.ma,hang_khach_hang.ten,tai_khoan.trang_thai \n" +
//        "FROM tai_khoan, hang_khach_hang\n" +
//        "WHERE tai_khoan.hang_khach_hang=hang_khach_hang.id")
//List<KhachHang> getList();
    @Query("select kd from KhachHang kd where kd.hangKhachHang is not null")
    Page<KhachHang> getAll(Pageable pageable);

    @Query("select kd from KhachHang  kd where kd.trangThai=1")
    List<KhachHang> getListStatus();
}
