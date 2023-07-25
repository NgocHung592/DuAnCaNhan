package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Timestamp;
import java.text.NumberFormat;
import java.util.Locale;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        long vnd = 10000000L;
        Locale localeVN = new Locale("vi", "VN");
        NumberFormat currencyVN = NumberFormat.getCurrencyInstance(localeVN);
        String str1 = currencyVN.format(vnd);
        System.out.println("Số " + vnd + " sau khi định dạng = " + str1);
        System.out.println("Kiểu đơn vị tiền tệ của " + localeVN.getCountry() +
                " là " + currencyVN.getCurrency());
    }

}
