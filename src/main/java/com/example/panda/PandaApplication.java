package com.example.panda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.filter.HiddenHttpMethodFilter;

@SpringBootApplication
@EnableScheduling
public class PandaApplication {

    public static void main(String[] args) {
        SpringApplication.run(PandaApplication.class, args);
    }
}
