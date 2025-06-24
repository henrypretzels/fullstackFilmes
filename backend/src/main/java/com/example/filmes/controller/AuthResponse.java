package com.example.filmes.controller;

import com.example.filmes.model.Usuario;

public class AuthResponse {
    private String token;
    private UserDto user;

    public AuthResponse(String token, Usuario usuario) {
        this.token = token;
        this.user = new UserDto(usuario);
    }

    // Getters
    public String getToken() {
        return token;
    }

    public UserDto getUser() {
        return user;
    }

    // Inner DTO for User to shape the output
    public static class UserDto {
        private String id;
        private String email;
        private String nome;
        private String role;

        public UserDto(Usuario usuario) {
            this.id = usuario.getId();
            this.email = usuario.getEmail();
            this.nome = usuario.getNome();
            this.role = usuario.isAdmin() ? "ADMIN" : "USER";
        }

        // Getters
        public String getId() {
            return id;
        }

        public String getEmail() {
            return email;
        }

        public String getNome() {
            return nome;
        }

        public String getRole() {
            return role;
        }
    }
} 