package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.response.HoaDonRepone;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface HoaDonService {
    Page<HoaDon> getAll(Integer pageNo);

    List<HoaDon> getList();

    HoaDon add(HoaDon hoaDon);

    HoaDon update(HoaDon hoaDon, UUID id);

    HoaDon detail(UUID id);

    HoaDon delete(UUID id);

    List<HoaDon> getExcel();

    Page<HoaDonRepone> getAlll(Integer pageNo);
}
