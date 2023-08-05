package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, UUID> {

    @Query("select cl from ChatLieu cl order by cl.ngayTao desc ")
    Page<ChatLieu> getAll(Pageable pageable);

    @Query("select cl from ChatLieu cl where cl.daXoa=false order by cl.ngayTao desc ")
    List<ChatLieu> getAllByStatus();

}
