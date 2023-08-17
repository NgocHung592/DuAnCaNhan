package com.example.demo.repository;


import com.example.demo.entity.TaiKhoan;
import com.example.demo.model.response.TaiKhoanReponse;
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
@Query(value = """ 
select a.id, a.ma,a.ho_ten,a.email,c.ten as ten_hang,a.so_dien_thoai,d.ten as ten_vai_tro,a.ngay_sinh,a.trang_thai,a.ngay_tao,b.mo_ta,b.phuong_xa,
b.tinh_thanh_pho,b.quan_huyen from  tai_khoan a inner join dia_chi b on a.id=b.tai_khoan_id inner join
hang_khach_hang c on a.hang_khach_hang=c.id inner join vai_tro d on d.id = a.vai_tro_id
""", nativeQuery = true)
    Page<TaiKhoanReponse> getAll(Pageable pageable);

    @Query("select kd from TaiKhoan  kd where kd.trangthai=1")
    List<TaiKhoan> getListStatus();

    @Query("select kh from TaiKhoan  kh where kh.ma LIKE %:ma% and kh.hangKhachHang is not null ")
    Page<TaiKhoan> findByMaContainingIgnoreCase(Pageable pageable, @Param("ma") String ma);

    @Query("select kh from TaiKhoan  kh where kh.sodienthoai LIKE %:sodienthoai% and kh.hangKhachHang is not null ")
    Page<TaiKhoan> findBySodienthoaiContainingIgnoreCase(Pageable pageable, @Param("sodienthoai") String sdt);

    @Query("select kh from TaiKhoan  kh where kh.hoten LIKE %:ten% and kh.hangKhachHang is not null ")
    Page<TaiKhoan> findByTenContainingIgnoreCase(Pageable pageable, @Param("ten") String ten);
}
