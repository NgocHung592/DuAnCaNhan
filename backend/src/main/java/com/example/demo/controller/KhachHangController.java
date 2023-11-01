package com.example.demo.controller;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.model.response.KhachHangReponse;
import com.example.demo.model.request.KhachHangRequest;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@CrossOrigin(origins = {"*"})
@RequestMapping("/khach-hang/")
@RestController
public class KhachHangController {
    @Autowired
    private KhachHangService khachHangService;
    @GetMapping("hien-thi")
    public Page<KhachHangReponse> getAllKhachHang(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo){
        return khachHangService.getAll(pageNo);

    }
    @PostMapping("add")
    public DiaChi post(@RequestBody KhachHangRequest khachHangRequest){
        System.out.println(khachHangRequest);
        return khachHangService.add(khachHangRequest);
    }
    @PostMapping("addid/{id}")
    public DiaChi postid(@RequestBody KhachHangRequest khachHangRequest,@PathVariable("id") String id){
        System.out.println(khachHangRequest);
        return khachHangService.addid(khachHangRequest,UUID.fromString(id));
    }
    @GetMapping("detail/{id}")
    public DiaChi detail(@PathVariable("id") String id) {
        return khachHangService.detail(UUID.fromString(id));
    }

    @PutMapping("update/{id1}/{id2}")
    public DiaChi update(@RequestBody KhachHangRequest khachHangRequest,@PathVariable("id1") String id1,@PathVariable("id2") String id2 ){
        return khachHangService.update(khachHangRequest,UUID.fromString(id1),UUID.fromString(id2));
    }


}

