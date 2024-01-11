package com.example.demo.service.Impl;

import com.example.demo.model.response.ThongKeReponse;
import com.example.demo.repository.ThongKeRepository;
import com.example.demo.service.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ThongKeServiceImpl implements ThongKeService {

    @Autowired
    private ThongKeRepository thongKeRepository;

    @Override
    public List<ThongKeReponse> getThongKeTongHop() {
        return thongKeRepository.getThongKeTongHop();
    }

    @Override
    public List<ThongKeReponse> getThongKeTongHopByDateRange(Date startDate, Date endDate) {
        return thongKeRepository.getThongKeTongHopByDateRange();
    }

}
