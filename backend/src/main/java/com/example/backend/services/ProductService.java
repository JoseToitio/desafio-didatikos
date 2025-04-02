package com.example.backend.services;

import com.example.backend.dto.CreateProductDto;
import com.example.backend.entitities.City;
import com.example.backend.entitities.Product;
import com.example.backend.repositories.CityRepository;
import com.example.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CityRepository cityRepository;

    public ProductService(ProductRepository productRepository, CityRepository cityRepository) {
        this.productRepository = productRepository;
        this.cityRepository = cityRepository;
    }

    public Product createProduct(CreateProductDto dto) {
        City city = cityRepository.findById(dto.getCidadeId())
                .orElseThrow(() -> new RuntimeException("Cidade não encontrada"));

        Product product = new Product();
        product.setNomeProduto(dto.getNomeProduto());
        product.setValorProduto(dto.getValorProduto());
        product.setEstoque(dto.getEstoque());
        product.setCidade(city);

        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    public Product updateProduct(Long id, CreateProductDto dto) {
        Product product = getProductById(id);
        City city = cityRepository.findById(dto.getCidadeId())
                .orElseThrow(() -> new RuntimeException("Cidade não encontrada"));

        product.setNomeProduto(dto.getNomeProduto());
        product.setValorProduto(dto.getValorProduto());
        product.setEstoque(dto.getEstoque());
        product.setCidade(city);

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}
