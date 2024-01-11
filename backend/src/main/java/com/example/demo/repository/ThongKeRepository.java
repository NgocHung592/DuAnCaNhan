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
        COUNT(DISTINCT hd.id) AS tong_don_hang,
        SUM(hdct.tong_so_luong) AS tong_san_pham,
        SUM(hd.tong_tien) AS tong_doanh_thu
    FROM
        hoa_don hd
    JOIN (
        SELECT
            hoa_don_id,
            SUM(so_luong) AS tong_so_luong
        FROM
            hoa_don_chi_tiet
        GROUP BY
            hoa_don_id
    ) hdct ON hd.id = hdct.hoa_don_id
    
    WHERE
        hd.trang_thai = 3
    GROUP BY
        YEAR(hd.ngay_thanh_toan), MONTH(hd.ngay_thanh_toan)
""", nativeQuery = true)
    List<ThongKeReponse> getThongKeTongHop();

    @Query(value = """
        SELECT
            MONTH(hd.ngay_thanh_toan) AS thang,
            YEAR(hd.ngay_thanh_toan) AS nam,
            COUNT(hdct.id) AS tong_san_pham,
            SUM(hd.tong_tien) AS tong_doanh_thu,
            COUNT(*) AS tong_don_hang
        FROM
            HoaDon hd
        JOIN
            HoaDonChiTiet hdct ON hd.id = hdct.hoaDon.id
        WHERE
            hd.trangThai = 3
            AND hd.ngayThanhToan BETWEEN :startDate AND :endDate
        GROUP BY
            YEAR(hd.ngay_thanh_toan), MONTH(hd.ngay_thanh_toan)
    """, nativeQuery = true)
    List<ThongKeReponse> getThongKeTongHopByDateRange();
}
