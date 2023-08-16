package com.example.demo.repository;

import com.example.demo.entity.CoAo;
import com.example.demo.entity.HoaTiet;
import com.example.demo.entity.PhongCach;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PhongCachRepository extends JpaRepository<PhongCach, UUID> {

    @Query("select pc from PhongCach pc order by pc.ngayTao desc ")
    Page<PhongCach> getAll(Pageable pageable);

    @Query("select pc from PhongCach  pc where pc.daXoa=false")
    List<PhongCach> getAllByStatus();
}
