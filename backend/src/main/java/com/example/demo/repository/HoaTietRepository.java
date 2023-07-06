package com.example.demo.repository;

import com.example.demo.entity.HoaTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HoaTietRepository extends JpaRepository<HoaTiet, UUID> {
}
