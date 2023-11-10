package com.example.demo.controller;

import com.example.demo.entity.MaGiamGia;
import com.example.demo.service.MaGiamGiaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/ma-giam-gia/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class MaGiamGiaController {

    @Autowired
    private MaGiamGiaService maGiamGiaService;

    @GetMapping("hien-thi")
    public Page<MaGiamGia> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return maGiamGiaService.getAll(pageNo);
    }

    @PostMapping("add")
    public MaGiamGia post(@RequestBody MaGiamGia maGiamGia, BindingResult result, Model model) throws Exception{
        maGiamGia.setMa(maGiamGia.getMa().toUpperCase());
        return maGiamGiaService.add(maGiamGia);
    }

    @PutMapping("update/{id}")
    public MaGiamGia update(@RequestBody MaGiamGia maGiamGia, @PathVariable("id") String id) {
        return maGiamGiaService.update(maGiamGia, UUID.fromString(id));
    }

    @GetMapping("detail/{id}")
    public MaGiamGia detail(@PathVariable("id") String id) {
        return maGiamGiaService.detail(UUID.fromString(id));
    }
}
