package com.example.backend.dto;

import lombok.Data;

@Data
public class CreateProductDto {
    private String nomeProduto;
    private Double valorProduto;
    private Integer estoque;
    private Long cidadeId;
}
