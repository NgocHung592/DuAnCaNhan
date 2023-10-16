package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.DanhMuc;
import com.example.demo.entity.KieuDang;
import com.example.demo.service.ChatLieuService;
import com.example.demo.service.DanhMucService;
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
@RequestMapping("/danh-muc/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class DanhMucRestController {
    @Autowired
    private DanhMucService danhMucService;

    @GetMapping("hien-thi")
    public Page<DanhMuc> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return danhMucService.getAll(pageNo);
    }
    @GetMapping("trang-thai")
    public List<DanhMuc> hienThiTrangThai() {
        return danhMucService.getListStatus();
    }

    @GetMapping("detail/{id}")
    public DanhMuc detail(@PathVariable("id") String id) {
        return danhMucService.getOne(UUID.fromString(id));
    }

    @PostMapping("add")
    public DanhMuc add(@RequestBody DanhMuc danhMuc) {
        return danhMucService.add(danhMuc);
    }

    @PutMapping("update/{id}")
    public DanhMuc update(@RequestBody DanhMuc danhMuc, @PathVariable("id") String id) {
        return danhMucService.update(danhMuc, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        danhMucService.delete(UUID.fromString(id));
    }
}
