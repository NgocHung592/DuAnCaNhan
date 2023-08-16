package com.example.demo.restcontroller;


import com.example.demo.entity.DanhMuc;
import com.example.demo.entity.DiaChi;
import com.example.demo.model.request.DiaChiRequest;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/dia-chi/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class DiaChiRestController {

    @Autowired
    private DiaChiService diaChiService;
    @GetMapping("hien-thi")
    public Page<DiaChi> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return diaChiService.getAll(pageNo);
    }
    @GetMapping("detail/{id}")
    public DiaChi detail(@PathVariable("id") String id) {
        return diaChiService.getOne(UUID.fromString(id));
    }

    @PostMapping("add")
    public DiaChi add(@RequestBody DiaChiRequest diaChi) {
        return diaChiService.add(diaChi);
    }

    @PutMapping("update/{id}")
    public DiaChi update(@RequestBody DiaChi diaChi, @PathVariable("id") String id) {
        return diaChiService.update(diaChi, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        diaChiService.delete(UUID.fromString(id));
    }
}
