package com.example.demo.restcontroller;

import com.example.demo.entity.HoaDon;
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
public class HoaDonRestController {
    @Autowired
    private HoaDonService hoaDonService;
//    @GetMapping("hien-thi")
//    public Page<HoaDon> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
//        return hoaDonService.getAll(pageNo);
//    }
@GetMapping("hien-thi")
public ResponseEntity getAlll(@RequestParam(name = "pageNo",defaultValue = "0") String pageNo){
    return new ResponseEntity(hoaDonService.getAlll(Integer.valueOf(pageNo)), HttpStatus.OK);
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

    @PutMapping("update/{id}")
    public HoaDon update(@RequestBody HoaDon hoaDon, @PathVariable("id") String id) {
        return hoaDonService.update(hoaDon, UUID.fromString(id));
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable("id") String id) {
        return new ResponseEntity(hoaDonService.delete(UUID.fromString(id)),HttpStatus.OK);
    }
}
