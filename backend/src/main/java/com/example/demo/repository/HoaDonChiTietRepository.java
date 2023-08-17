package com.example.demo.repository;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDonChiTietId;
import com.example.demo.model.response.HoaDonChiTietReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, UUID> {

    @Query(value = """
            select f.id as id_hoa_don_chi_tiet, j.ma as ma_hoa_don,e.anh_noi_bat as anh_noi_bat, b.ten as ten_san_pham,d.ten as ten_mau_sac ,g.ten as ten_kich_thuoc,f.don_gia as don_gia,f.so_luong as so_luong,f.thanh_tien as thanh_tien
                                    from san_pham_chi_tiet a inner join san_pham b on a.san_pham_id=b.id
                                    inner join kich_thuoc_mau_sac c on a.id=c.chi_tiet_san_pham_id\s
                                    inner join mau_sac d on c.mau_sac_id=d.id
                                    inner join kich_thuoc g on g.id=c.kich_thuoc_id
                                    inner join hinh_anh e on e.chi_tiet_san_pham_id=a.id
                                    inner join hoa_don_chi_tiet f on f.kich_thuoc_mau_sac_id=c.id
                                    inner join hoa_don j on j.id=f.hoa_don_id
                                    where j.ma like ?1
                                    group by f.id,j.ma,b.ten,a.da_xoa,a.ngay_tao ,f.don_gia,d.ten,f.so_luong,e.anh_noi_bat,g.ten,f.thanh_tien
                                    order by a.ngay_tao desc
            """, nativeQuery = true)
    List<HoaDonChiTietReponse> getGioHang(String ma);
}
