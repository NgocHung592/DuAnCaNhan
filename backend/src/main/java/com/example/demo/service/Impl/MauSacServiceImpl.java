package com.example.demo.service.Impl;

import com.example.demo.entity.MauSac;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Service
public class MauSacServiceImpl implements MauSacService {

    @Autowired
    private MauSacRepository mauSacRepository;
    long currentTimestampMillis = System.currentTimeMillis();

    @Override
    public Page<MauSac> getAll(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        return mauSacRepository.getAll(pageable);
    }

    @Override
    public List<MauSac> getAllByStatus() {
        return mauSacRepository.getAllByStatus();
    }

    @Override
    public MauSac getOne(UUID id) {
        return mauSacRepository.findById(id).orElse(null);
    }

    @Override
    public MauSac add(MauSac mauSac) {
        MauSac mauSacSave= MauSac.builder()
                .ma(mauSac.getMa())
                .ten(mauSac.getTen())
                .daXoa(mauSac.getDaXoa())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .build();
        return mauSacRepository.save(mauSacSave);
    }

    @Override
    public MauSac update(MauSac mauSac, UUID id) {
        MauSac mauSacUpdate= MauSac.builder()
                .id(id)
                .ma(mauSac.getMa())
                .ten(mauSac.getTen())
                .daXoa(mauSac.getDaXoa())
                .ngayTao(new Timestamp(currentTimestampMillis))
                .nguoiTao(null)
                .build();
        return mauSacRepository.save(mauSacUpdate);
    }

    @Override
    public void delete(UUID id) {
        mauSacRepository.deleteById(id);
    }
}
