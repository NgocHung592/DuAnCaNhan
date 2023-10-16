package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.PhongCach;
import com.example.demo.service.MauSacService;
import com.example.demo.service.PhongCachService;
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
@RequestMapping("/phong-cach/")
@CrossOrigin(origins = "*",maxAge = 4800,allowCredentials = "false")
public class PhongCachRestController {

    @Autowired
    private PhongCachService phongCachService;

    @GetMapping("hien-thi")
    public Page<PhongCach> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return phongCachService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public List<PhongCach> hienThiTheoTrangThai() {
        return phongCachService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public PhongCach detail(@PathVariable("id") String id) {
        return phongCachService.getOne(UUID.fromString(id));
    }

    @PostMapping("add")
    public PhongCach add(@RequestBody PhongCach phongCach) {
        return phongCachService.add(phongCach);
    }

    @PutMapping("update/{id}")
    public PhongCach update(@RequestBody PhongCach phongCach, @PathVariable("id") String id) {
        return phongCachService.update(phongCach, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        phongCachService.delete(UUID.fromString(id));
    }
}
