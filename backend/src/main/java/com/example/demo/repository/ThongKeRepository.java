package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.response.ThongKeReponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ThongKeRepository extends JpaRepository<HoaDon, UUID> {
    @Query(value = """
    SELECT
        MONTH(hd.ngay_thanh_toan) AS thang,
        YEAR(hd.ngay_thanh_toan) AS nam,
        COUNT(hdct.id) AS tong_san_pham,
        SUM(hd.tong_tien) AS tong_doanh_thu,
        COUNT(*) AS tong_don_hang
    FROM
        hoa_don hd
    JOIN
        hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id
    
    WHERE
        hd.trang_thai = 3
    GROUP BY
        YEAR(hd.ngay_thanh_toan), MONTH(hd.ngay_thanh_toan)
""", nativeQuery = true)
    List<ThongKeReponse> getThongKeTongHop();

}
