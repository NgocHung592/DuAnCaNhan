package com.example.demo.repository;

import com.example.demo.entity.SanPham;
import com.example.demo.model.response.SanPhamReponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, UUID> {

    @Query("select sp from SanPham  sp where sp.daXoa=false")
    List<SanPham> getAllByStatus();

    @Query(value = """
            select sp.id,sp.ma,sp.ten, sum(spct.so_luong)as'so_luong',sp.mo_ta,sp.da_xoa from san_pham_chi_tiet spct
            inner join san_pham sp on sp.id=spct.san_pham_id
            group by sp.id,sp.ma,sp.ten, sp.mo_ta,sp.da_xoa ,sp.ngay_tao
            order by sp.ngay_tao desc
            """, nativeQuery = true)
    Page<SanPhamReponse> getAll(Pageable pageable);

    Optional<SanPham> findByTen(String ten);
}
