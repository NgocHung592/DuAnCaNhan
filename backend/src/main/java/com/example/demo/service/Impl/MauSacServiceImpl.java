package com.example.demo.service.Impl;

import com.example.demo.entity.MauSac;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    private MauSacRepository mauSacRepository;

    @Override
    public Page<MauSac> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return mauSacRepository.findAll(pageable);
    }

    @Override
    public MauSac getOne(UUID id) {
        return mauSacRepository.findById(id).orElse(null);
    }

    @Override
    public MauSac add(MauSac mauSac) {
        return mauSacRepository.save(mauSac);
    }

    @Override
    public MauSac update(MauSac mauSac, UUID id) {
        if (mauSacRepository.existsById(id)) {
            return mauSacRepository.save(mauSac);
        }
        return null;
    }

    @Override
    public void delete(UUID id) {
        mauSacRepository.deleteById(id);
    }
}
