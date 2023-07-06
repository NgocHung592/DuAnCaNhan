package com.example.demo.service;

import com.example.demo.entity.KieuDang;
import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface MauSacService {

    Page<MauSac> getAll(Integer pageNo);

    MauSac getOne(UUID id);

    MauSac add(MauSac mauSac);

    MauSac update(MauSac mauSac, UUID id);

    void delete(UUID id);
}
