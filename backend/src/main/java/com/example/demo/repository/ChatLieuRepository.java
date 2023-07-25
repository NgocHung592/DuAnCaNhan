package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, UUID> {

    @Query("select cl from ChatLieu cl where cl.daXoa=false ")
    List<ChatLieu> getAllByStatus();
}
