package com.example.demo.service.Impl;

import com.example.demo.entity.HoaTiet;
import com.example.demo.repository.HoaTietRepository;
import com.example.demo.service.HoaTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HoaTietServiceImpl implements HoaTietService {

    @Autowired
    private HoaTietRepository hoaTietRepository;

    @Override
    public Page<HoaTiet> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return hoaTietRepository.findAll(pageable);
    }

    @Override
    public List<HoaTiet> getAllByStatus() {
        return hoaTietRepository.getAllByStatus();
    }

    @Override
    public HoaTiet add(HoaTiet hoaTiet) {
        return hoaTietRepository.save(hoaTiet);
    }

    @Override
    public HoaTiet update(HoaTiet hoaTiet, UUID id) {
        if (hoaTietRepository.existsById(id)) {
            return hoaTietRepository.save(hoaTiet);
        }
        return null;
    }

    @Override
    public HoaTiet detail(UUID id) {
        return hoaTietRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        hoaTietRepository.deleteById(id);
    }
}
