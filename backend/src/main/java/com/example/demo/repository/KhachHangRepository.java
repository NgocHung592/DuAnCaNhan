package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
import com.example.demo.model.response.KhachHangReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, UUID> {
    @Query(value = """  
              select a.id,b.id, a.ma,a.ho_ten,a.email,a.mat_khau,a.so_dien_thoai,a.gioi_tinh,a.ngay_sinh,a.trang_thai,a.ngay_tao,b.mo_ta,b.phuong_xa,
            b.tinh_thanh_pho,b.quan_huyen from  khach_hang a inner join dia_chi b on a.id=b.khach_hang_id  order by  a.ngay_tao desc 
            """,nativeQuery = true)
    Page<KhachHangReponse> getKhachHangAll(Pageable pageable);
}
