package com.example.demo.repository;

import com.example.demo.entity.KieuDang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
public interface KieuDangRepository extends JpaRepository<KieuDang, UUID> {

    @Query("select kd from KieuDang  kd where kd.daXoa=false")
    List<KieuDang> getListStatus();

}
