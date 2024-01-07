package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.HoaDonResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface HoaDonService {

    Page<HoaDonResponse> getPage(Integer pageNo);

    List<HoaDon> getHoaDonCho();

    HoaDon add(HoaDon hoaDon);

    HoaDon addOnline(HoaDon hoaDon);

    HoaDon update(HoaDonRequest hoaDonRequest, UUID id);

    HoaDon detail(UUID id);

    Page<HoaDonResponse> search(Integer pageNo, String search);

    Page<HoaDonResponse> loc(Integer pageNo, String trangThai);

}
