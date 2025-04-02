package com.example.backend.services;

import com.example.backend.dto.CreateCityDto;
import com.example.backend.entitities.City;
import com.example.backend.repositories.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> findAll() {
        return cityRepository.findAll();
    }

    public City findById(long id) {
        return cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cidade não encontrada"));
    }

    public City createCity(CreateCityDto dto) {
        City city = new City();
        city.setNome(dto.getNome());
        return cityRepository.save(city);
    }
}
