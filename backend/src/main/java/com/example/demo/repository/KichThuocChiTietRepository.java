package com.example.demo.repository;

import com.example.demo.entity.KichThuocMauSac;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KichThuocChiTietRepository extends JpaRepository<KichThuocMauSac, UUID> {

    @Query("select ktct from KichThuocMauSac  ktct where ktct.sanPhamChiTiet.id=?1")
    List<KichThuocMauSac> getList(UUID id);

}
