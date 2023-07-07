package com.example.demo.restcontroller;

import com.example.demo.entity.HoaDon;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/hoa-don/")
public class HoaDonRestController {
    @Autowired
    private HoaDonService hoaDonService;
    @GetMapping("hien-thi")
    public Page<HoaDon> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaDonService.getAll(pageNo);
    }

    @GetMapping("detail/{id}")
    public HoaDon detail(@PathVariable("id") String id) {
        return hoaDonService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public HoaDon add(@RequestBody HoaDon hoaDon) {
        return hoaDonService.add(hoaDon);
    }

    @PutMapping("update/{id}")
    public HoaDon update(@RequestBody HoaDon hoaDon, @PathVariable("id") String id) {
        return hoaDonService.update(hoaDon, UUID.fromString(id));
    }
}
