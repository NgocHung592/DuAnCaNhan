package com.example.demo.service;

import com.example.demo.model.response.ThongKeReponse;

import java.util.Date;
import java.util.List;


public interface ThongKeService {
    List<ThongKeReponse> getThongKeTongHop();
    List<ThongKeReponse> getThongKeTongHopByDateRange(Date startDate, Date endDate);
}
