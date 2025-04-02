package com.example.backend.entitities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codProduto;

    private String nomeProduto;
    private Double valorProduto;
    private Integer estoque;

    @ManyToOne
    @JoinColumn(name = "cidade_id", nullable = false)
    private City cidade;
}
