package com.example.demo.service.Impl;

import com.example.demo.entity.HangKhachHang;
import com.example.demo.entity.VaiTro;
import com.example.demo.repository.HangKhachHangRepository;
import com.example.demo.repository.VaiTroRepository;
import com.example.demo.service.VaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaiTroServiceImpl implements VaiTroService {
    @Autowired
    private VaiTroRepository vaiTroRepository;
    @Override
    public List<VaiTro> getListStatus() {
        return vaiTroRepository.getListStatus();
    }

}
