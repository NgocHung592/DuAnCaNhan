package com.example.demo.controller;

import com.example.demo.entity.MaGiamGiaChiTiet;
import com.example.demo.service.MaGiamGiaChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/ma-giam-gia/ma-giam-gia-chi-tiet/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class MaGiamGiaChiTietController {
    @Autowired
    private MaGiamGiaChiTietService maGiamGiaChiTietService;

    @GetMapping("hien-thi")
    public Page<MaGiamGiaChiTiet> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return maGiamGiaChiTietService.getAll(pageNo);
    }

    @PostMapping("add")
    public MaGiamGiaChiTiet post(@RequestBody MaGiamGiaChiTiet maGiamGiaChiTiet, BindingResult result, Model model) throws Exception{
        return maGiamGiaChiTietService.add(maGiamGiaChiTiet);
    }

    @PutMapping("update/{id}")
    public MaGiamGiaChiTiet update(@RequestBody MaGiamGiaChiTiet maGiamGiaChiTiet, @PathVariable("id") String id) {
        return maGiamGiaChiTietService.update(maGiamGiaChiTiet, UUID.fromString(id));
    }

    @GetMapping("detail/{id}")
    public MaGiamGiaChiTiet detail(@PathVariable("id") String id) {
        return maGiamGiaChiTietService.detail(UUID.fromString(id));
    }
}
