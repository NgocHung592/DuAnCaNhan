package com.example.demo.service;

import com.example.demo.entity.MauSac;
import com.example.demo.entity.PhongCach;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface PhongCachService {

    Page<PhongCach> getAll(Integer pageNo);

    PhongCach getOne(UUID id);

    PhongCach add(PhongCach phongCach);

    PhongCach update(PhongCach phongCach, UUID id);

    void delete(UUID id);
}
