package com.example.demo.service;

import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.PhongCach;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface PhongCachService {

    Page<PhongCach> getAll(Integer pageNo);

    List<PhongCach> getAllByStatus();

    PhongCach getOne(UUID id);

    PhongCach add(PhongCach phongCach);

    PhongCach update(PhongCach phongCach, UUID id);

    void delete(UUID id);
}
