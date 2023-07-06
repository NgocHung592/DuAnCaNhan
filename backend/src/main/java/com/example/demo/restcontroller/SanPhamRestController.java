package com.example.demo.restcontroller;

import com.example.demo.entity.SanPham;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/san-pham/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class SanPhamRestController {

    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("hien-thi")
    public Page<SanPham> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return sanPhamService.getAll(pageNo);
    }

    @GetMapping("detail/{id}")
    public SanPham detail(@PathVariable("id") String id) {
        return sanPhamService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public SanPham add(@RequestBody SanPham sanPham) {
        return sanPhamService.add(sanPham);
    }

    @PutMapping("update/{id}")
    public SanPham update(@RequestBody SanPham sanPham, @PathVariable("id") String id) {
        return sanPhamService.update(sanPham,UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        sanPhamService.delete(UUID.fromString(id));
    }
}
