package com.example.demo.service;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.SanPhamChiTiet;
import com.example.demo.model.request.DiaChiRequest;
import com.example.demo.model.request.SanPhamChiTietRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface DiaChiService {
    Page<DiaChi> getAll(Integer pageNo);
    DiaChi getOne(UUID id);
    DiaChi add(DiaChiRequest diaChiRequest);
    DiaChi update(DiaChi diaChi, UUID id);
//    List<DiaChi> add(List<DiaChiRequest> diaChiRequests);

    void delete(UUID id);
}
