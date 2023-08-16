package com.example.demo.repository;

import com.example.demo.entity.CoAo;
import com.example.demo.entity.TayAo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface TayAoRepository extends JpaRepository<TayAo, UUID> {

    @Query("select ta from TayAo ta order by ta.ngayTao desc ")
    Page<TayAo> getAll(Pageable pageable);

    @Query("select ta from TayAo ta where ta.daXoa=false ")
    List<TayAo> getAllByStatus();
}
