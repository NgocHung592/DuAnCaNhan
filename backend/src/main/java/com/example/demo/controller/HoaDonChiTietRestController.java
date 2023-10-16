package com.example.demo.restcontroller;


import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.model.request.HoaDonChiTietRequest;
import com.example.demo.model.response.HoaDonChiTietReponse;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/hoa-don-chi-tiet/")
public class HoaDonChiTietRestController {
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;

    @GetMapping("hien-thi/{ma}")
    public ResponseEntity hienThi(@PathVariable("ma") String ma) {
        return new ResponseEntity(hoaDonChiTietService.getAll(ma),HttpStatus.OK);
    }

//    @GetMapping("detail/{id}")
//    public HoaDonChiTiet detail(@PathVariable("id") String id) {
//        return hoaDonChiTietService.detail(UUID.fromString(id));
//    }

    @PostMapping("add")
    public HoaDonChiTiet add(@RequestBody HoaDonChiTietRequest hoaDonChiTietRequest) {
        return hoaDonChiTietService.add(hoaDonChiTietRequest);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody HoaDonChiTietRequest hoaDonChiTietRequest, @PathVariable("id") String id) {
        return new ResponseEntity(hoaDonChiTietService.update(hoaDonChiTietRequest, UUID.fromString(id)),HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable("id") String id) {
        return new ResponseEntity(hoaDonChiTietService.delete(UUID.fromString(id)), HttpStatus.OK);
    }
}
