package com.example.demo.service;

import com.example.demo.entity.DanhMuc;
import com.example.demo.entity.KieuDang;
import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface DanhMucService {

    Page<DanhMuc> getAll(Integer pageNo);

    List<DanhMuc> getListStatus();

    DanhMuc getOne(UUID id);

    DanhMuc add(DanhMuc danhMuc);

    DanhMuc update(DanhMuc danhMuc, UUID id);

    void delete(UUID id);
}
