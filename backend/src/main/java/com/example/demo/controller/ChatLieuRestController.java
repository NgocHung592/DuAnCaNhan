package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.service.ChatLieuService;
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
@RequestMapping("/chat-lieu/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class ChatLieuRestController {

    @Autowired
    private ChatLieuService chatLieuService;

    @GetMapping("hien-thi")
    public Page<ChatLieu> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return chatLieuService.getAll(pageNo);
    }

    @GetMapping("trang-thai")
    public List<ChatLieu> hienThiTheoTrangThai() {
        return chatLieuService.getAllByStatus();
    }

    @GetMapping("detail/{id}")
    public ResponseEntity detail(@PathVariable("id") String id) {
        return new ResponseEntity(chatLieuService.detail(UUID.fromString(id)), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity add(@RequestBody ChatLieu chatLieu) {
        return new ResponseEntity(chatLieuService.add(chatLieu),HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity update(@RequestBody ChatLieu chatLieu, @PathVariable("id") String id) {
        return new ResponseEntity(chatLieuService.update(chatLieu, UUID.fromString(id)),HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        chatLieuService.delete(UUID.fromString(id));
    }
}
