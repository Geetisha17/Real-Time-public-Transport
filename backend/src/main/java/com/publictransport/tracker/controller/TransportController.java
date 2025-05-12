package com.publictransport.tracker.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transport")
public class TransportController{
    @GetMapping("/")
    public String homePage()
    {
        return "Welcome to the public transport Tracker API";
    }
}