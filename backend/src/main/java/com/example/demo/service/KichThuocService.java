package com.example.demo.service;

import com.example.demo.entity.KichThuoc;
import com.example.demo.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface KichThuocService {

    Page<KichThuoc> getAll(Integer pageNo);

    KichThuoc add(KichThuoc kichThuoc);

    KichThuoc update(KichThuoc kichThuoc, UUID id);

    KichThuoc detail(UUID id);

    void delete(UUID id);
}
