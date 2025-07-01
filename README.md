# 🎬 Catálogo de Filmes

Uma aplicação web full-stack para gerenciamento de filmes, avaliações e favoritos.

## 🚀 Funcionalidades

- Listagem de filmes em cards com imagem, título e nota média
- Página de detalhes do filme com sinopse, gênero(s), ano de lançamento e lista de avaliações
- Busca por título
- Filtro por gênero
- Marcar/Desmarcar filme como favorito
- Visualizar lista de favoritos
- Avaliação de filmes com nota de 1 a 5 estrelas
- Cadastro de nova avaliação com nome do autor e comentário
- Interface responsiva e organizada
- Autenticação de usuários

## 🛠️ Tecnologias Utilizadas

### Frontend
- Vue.js 3
- TypeScript
- Vue Router
- Pinia (Gerenciamento de Estado)
- Axios (Requisições HTTP)

### Backend
- Spring Boot 3.5.0
- Java 21
- MongoDB
- Spring Security
- JWT para autenticação
- Maven

## 📋 Pré-requisitos

- Node.js 18+
- Java 21
- MongoDB
- Maven

## 🔧 Instalação

### Backend

1. Clone o repositório
2. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
3. Instale as dependências:
   ```bash
   mvn install
   ```
4. Configure o MongoDB no arquivo `application.properties`
5. Execute o projeto:
   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. Navegue até a raiz do projeto, no qual se localiza o frontend do projeto
   ```bash
   cd
   ```
2. Instale as dependências:
 ```bash
  npm install
   ```
3. Execute o projeto:
 ```bash
  npm run dev
   ```

## 📝 Documentação da API

### Autenticação

#### Registrar Usuário

POST /api/auth/registrar
Content-Type: application/json

{
    "nome": "string",
    "email": "string",
    "senha": "string"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "string",
    "senha": "string"
}
```

### Filmes

#### Listar Todos os Filmes
```
GET /api/filmes
```

#### Buscar Filme por ID
```
GET /api/filmes/{id}
```

#### Buscar Filmes por Título
```
GET /api/filmes/search?titulo={titulo}
```

#### Filtrar Filmes por Gênero
```
GET /api/filmes/genero?genero={genero}
```

### Avaliações

#### Listar Avaliações de um Filme
```
GET /api/avaliacoes/{filmeId}
```

#### Adicionar Avaliação
```
POST /api/avaliacoes/{filmeId}
Content-Type: application/json

{
    "nota": "integer (1-5)",
    "comentario": "string"
}
```

### Favoritos

#### Listar Favoritos
```
GET /api/favoritos
```

#### Adicionar aos Favoritos
```
POST /api/favoritos/{filmeId}
```

#### Remover dos Favoritos
```
DELETE /api/favoritos/{filmeId}
```

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
