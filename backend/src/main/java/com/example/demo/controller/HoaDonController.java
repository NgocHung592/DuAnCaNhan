package com.example.demo.controller;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.HoaDonRepone;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/hoa-don/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class HoaDonController {
    @Autowired
    private HoaDonService hoaDonService;

    //    @GetMapping("hien-thi")
//    public Page<HoaDon> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
//        return hoaDonService.getAll(pageNo);
//    }
    @GetMapping("hien-thi")
    public Page<HoaDonRepone> getAlll(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaDonService.getAlll(pageNo);
    }

    @GetMapping("/search")
    public Page<HoaDonRepone> searchProductsByName(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "search") String search) {
        return hoaDonService.getSearch(pageNo, search);
    }

    @GetMapping("get-list")
    public ResponseEntity getList() {
        return new ResponseEntity(hoaDonService.getList(), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public HoaDon detail(@PathVariable("id") String id) {
        return hoaDonService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public HoaDon add(@RequestBody HoaDon hoaDon) {
        return hoaDonService.add(hoaDon);
    }

    @PutMapping("update-khach-co-san/{id}")
    public HoaDon updateKhachCoSan(@RequestBody HoaDonRequest hoaDonRequest, @PathVariable("id") String id) {
        return hoaDonService.updateKhachCoSan(hoaDonRequest, UUID.fromString(id));
    }
    @PutMapping("update-khach-le/{id}")
    public HoaDon updateKhachLe(@RequestBody HoaDonRequest hoaDonRequest, @PathVariable("id") String id) {
        return hoaDonService.updateKhachLe(hoaDonRequest, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable("id") String id) {
        return new ResponseEntity(hoaDonService.delete(UUID.fromString(id)), HttpStatus.OK);
    }
}
