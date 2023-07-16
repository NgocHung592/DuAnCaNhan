package com.example.demo.repository;

import com.example.demo.entity.HoaTiet;
import com.example.demo.entity.KichThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KichThuocRepository extends JpaRepository<KichThuoc, UUID> {

    @Query("select kt from KichThuoc  kt where kt.trangThai=1")
    List<KichThuoc> getAllByStatus();
}
