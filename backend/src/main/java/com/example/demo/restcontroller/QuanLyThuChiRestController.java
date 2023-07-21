package com.example.demo.restcontroller;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonThuChi;
import com.example.demo.repository.HoaDonThuChiRepository;
import com.example.demo.service.HoaDonService;
import com.example.demo.service.HoaDonThuChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/thu-chi/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class QuanLyThuChiRestController {
    @Autowired
    private HoaDonThuChiService hoaDonService;
    @GetMapping("hien-thi")
    public Page<HoaDonThuChi> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaDonService.getAll(pageNo);
    }
}
