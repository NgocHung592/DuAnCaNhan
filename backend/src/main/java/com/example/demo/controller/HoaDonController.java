package com.example.demo.controller;

import com.example.demo.entity.HoaDon;
import com.example.demo.model.request.HoaDonRequest;
import com.example.demo.model.response.HoaDonResponse;
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


    @GetMapping("hien-thi")
    public Page<HoaDonResponse> getPage(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return hoaDonService.getPage(pageNo);
    }

    @GetMapping("get-list")
    public ResponseEntity getList() {
        return new ResponseEntity(hoaDonService.getHoaDonCho(), HttpStatus.OK);
    }

    @GetMapping("detail/{id}")
    public HoaDon detail(@PathVariable("id") String id) {
        return hoaDonService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public HoaDon add(@RequestBody HoaDon hoaDon) {
        return hoaDonService.add(hoaDon);
    }

    @PostMapping("addonline")
    public HoaDon addOnline(@RequestBody HoaDon hoaDon) {
        return hoaDonService.addOnline(hoaDon);
    }

    @PutMapping("update/{id}")
    public HoaDon updateKhachCoSan(@RequestBody HoaDonRequest hoaDonRequest, @PathVariable("id") String id) {
        return hoaDonService.update(hoaDonRequest, UUID.fromString(id));
    }

    @GetMapping("/search")
    public Page<HoaDonResponse> search(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "search") String search) {
        return hoaDonService.search(pageNo, search);
    }

    @GetMapping("/loc")
    public Page<HoaDonResponse> loc(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo, @RequestParam(name = "trangThai") String trangThai) {
        return hoaDonService.loc(pageNo, trangThai);
    }

}
