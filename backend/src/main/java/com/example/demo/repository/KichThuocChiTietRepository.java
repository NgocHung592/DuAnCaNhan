package com.example.demo.repository;

import com.example.demo.entity.KichThuocChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Repository
public interface KichThuocChiTietRepository extends JpaRepository<KichThuocChiTiet, UUID> {

    @Query("select ktct from KichThuocChiTiet  ktct where ktct.sanPhamChiTiet.id=?1")
    List<KichThuocChiTiet> getList(UUID id);

}
