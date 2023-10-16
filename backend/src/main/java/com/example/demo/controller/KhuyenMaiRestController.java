package com.example.demo.restcontroller;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/khuyen-mai/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class KhuyenMaiRestController {

    @Autowired
    private KhuyenMaiService khuyenMaiService;

    @GetMapping("hien-thi")
    public Page<KhuyenMai> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return khuyenMaiService.getAll(pageNo);
    }

    @PostMapping("add")
    public KhuyenMai add(@RequestBody KhuyenMai khuyenMai) {
        return khuyenMaiService.add(khuyenMai);
    }

    @PutMapping("update/{id}")
    public KhuyenMai update(@RequestBody KhuyenMai khuyenMai, @PathVariable("id") String id) {
        return khuyenMaiService.update(khuyenMai, UUID.fromString(id));
    }

    @GetMapping("detail/{id}")
    public KhuyenMai detail(@PathVariable("id") String id) {
        return khuyenMaiService.detail(UUID.fromString(id));
    }
}
