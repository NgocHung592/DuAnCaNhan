package com.example.demo.repository;

import com.example.demo.entity.CoAo;
import com.example.demo.entity.HoaTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaTietRepository extends JpaRepository<HoaTiet, UUID> {

    @Query("select ht from HoaTiet ht order by ht.ngayTao desc ")
    Page<HoaTiet> getAll(Pageable pageable);

    @Query("select ht from HoaTiet  ht where ht.daXoa=false")
    List<HoaTiet> getAllByStatus();
}
