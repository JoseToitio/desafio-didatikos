package com.example.backend.config;

import com.example.backend.entitities.City;
import com.example.backend.repositories.CityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedCities(CityRepository cityRepository) {
        return args -> {
            if (cityRepository.count() == 0) { // Verifica se já existem cidades no banco
                List<City> cidades = List.of(
                        new City(null, "São Paulo"),
                        new City(null, "Rio de Janeiro"),
                        new City(null, "Belo Horizonte"),
                        new City(null, "Salvador"),
                        new City(null, "Curitiba")
                );
                cityRepository.saveAll(cidades);
                System.out.println("Cidades iniciais populadas no banco!");
            }
        };
    }
}
