package com.example.demo.restcontroller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.service.ChatLieuService;
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

import java.util.UUID;

@RestController
@RequestMapping("/chat-lieu/")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;

    @GetMapping("hien-thi")
    public Page<ChatLieu> hienThi(@RequestParam(name = "pageNo", defaultValue = "0") Integer pageNo) {
        return chatLieuService.getAll(pageNo);
    }

    @GetMapping("detail/{id}")
    public ChatLieu detail(@PathVariable("id") String id) {
        return chatLieuService.detail(UUID.fromString(id));
    }

    @PostMapping("add")
    public ChatLieu add(@RequestBody ChatLieu chatLieu) {
        return chatLieuService.add(chatLieu);
    }

    @PutMapping("update/{id}")
    public ChatLieu update(@RequestBody ChatLieu chatLieu, @PathVariable("id") String id) {
        return chatLieuService.update(chatLieu, UUID.fromString(id));
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") String id) {
        chatLieuService.delete(UUID.fromString(id));
    }
}
