package com.example.demo.repository;

import com.example.demo.model.response.HoaDonResponse;
import com.example.demo.model.response.ThongKeReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ThongKeRepository {
    @Query(value = """
            SELECT
                                      MONTH(ngay_thanh_toan) AS thang,
                                      YEAR(ngay_thanh_toan) AS nam,
                                      SUM(tong_tien) AS tong_doanh_thu
                                  FROM
                                      hoa_don
                                  WHERE
                                      trang_thai = 4 -- Giả sử trạng thái 4 là hóa đơn đã hoàn thành/thanh toán
                                  GROUP BY
                                      YEAR(ngay_thanh_toan),
                                      MONTH(ngay_thanh_toan)
                                  ORDER BY
                                      nam, thang;           """, nativeQuery = true)
    List<ThongKeReponse> getTongDoanhThu();

    @Query(value = """
            SELECT
                MONTH(ngay_thanh_toan) AS thang,
                YEAR(ngay_thanh_toan) AS nam,
                COUNT(*) AS tong_don_hang
            FROM
                hoa_don
            WHERE
                trang_thai = 4 -- Giả sử trạng thái 4 là hóa đơn đã hoàn thành/thanh toán
            GROUP BY
                YEAR(ngay_thanh_toan),
                MONTH(ngay_thanh_toan)
            ORDER BY
                nam, thang;
                       """, nativeQuery = true)
    List<ThongKeReponse> getTongDonHang();

    @Query(value = """
            SELECT
                MONTH(ngay_thanh_toan) AS thang,
                YEAR(ngay_thanh_toan) AS nam,
                SUM(so_luong) AS tong_san_pham
            FROM
                gio_hang_chi_tiet ghct
            JOIN
                gio_hang gh ON ghct.gio_hang_id = gh.id
            LEFT JOIN
                hoa_don hd ON ghct.hoa_don_id = hd.id
            WHERE
                (hd.trang_thai = 4 OR gh.trang_thai = 4) -- Giả sử trạng thái 4 là đã thanh toán/hoàn thành
            GROUP BY
                YEAR(ngay_thanh_toan),
                MONTH(ngay_thanh_toan)
            ORDER BY
                nam, thang;
            
                       """, nativeQuery = true)
    List<ThongKeReponse> getTongSanPham();

    @Query(value = """
            SELECT
                MONTH(ngay_thanh_toan) AS thang,
                YEAR(ngay_thanh_toan) AS nam,
                COUNT(DISTINCT kh.id) AS tong_khach_hang
            FROM
                hoa_don hd
            JOIN
                khach_hang kh ON hd.khach_hang_id = kh.id
            WHERE
                hd.trang_thai = 4 -- Giả sử trạng thái 4 là hóa đơn đã thanh toán/hoàn thành
            GROUP BY
                YEAR(ngay_thanh_toan),
                MONTH(ngay_thanh_toan)
            ORDER BY
                nam, thang;
            
            
                       """, nativeQuery = true)
    List<ThongKeReponse> getTongKhachHang();
}
