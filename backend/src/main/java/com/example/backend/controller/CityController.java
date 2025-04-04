package com.example.backend.controller;

import com.example.backend.dto.CreateCityDto;
import com.example.backend.entitities.City;
import com.example.backend.services.CityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cidades")
public class CityController {
    private final CityService cityService;
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @PostMapping
    public ResponseEntity<City> create(@RequestBody CreateCityDto dto) {
        return ResponseEntity.ok(cityService.createCity(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> get(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<City>> getAll() {
        return ResponseEntity.ok(cityService.findAll());
    }
}
