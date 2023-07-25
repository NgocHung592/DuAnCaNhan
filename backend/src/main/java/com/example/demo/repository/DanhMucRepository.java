package com.example.demo.repository;

import com.example.demo.entity.DanhMuc;
import com.example.demo.entity.KieuDang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DanhMucRepository extends JpaRepository<DanhMuc, UUID> {

    @Query("select dm from DanhMuc  dm where dm.daXoa=false")
    List<DanhMuc> getListStatus();
}
