package com.example.demo.controller;

<<<<<<< HEAD:backend/src/main/java/com/example/demo/controller/PhongCachController.java
import com.example.demo.entity.PhongCach;
import com.example.demo.service.PhongCachService;
=======
import com.example.demo.model.request.KieuDangRequest;
import com.example.demo.service.KieuDangService;
>>>>>>> main:backend/src/main/java/com/example/demo/controller/KieuDangRestController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class PhongCachController {

    @Autowired
    private PhongCachService phongCachService;

    @GetMapping("hien-thi")
    public ResponseEntity hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return new ResponseEntity(phongCachService.getAll(pageNo), HttpStatus.OK);
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
