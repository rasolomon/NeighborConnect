package com.neighborconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String city;
    private String state;
    private Integer zipCode;
    private String phone;
    private String email;
    private String description;
    private String logo;
    private String website;

    @ManyToOne
    private User owner;

    @ManyToOne
    private Category category;

}
