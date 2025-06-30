#!/bin/bash

# cURL Templates for Film Catalog API Testing
# Base URL - adjust if your backend runs on a different port
BASE_URL="http://localhost:8080/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎬 Film Catalog API - cURL Templates${NC}"
echo "=========================================="
echo ""

# Function to print section headers
print_section() {
    echo -e "\n${YELLOW}$1${NC}"
    echo "----------------------------------------"
}

# Function to print curl command
print_curl() {
    echo -e "${GREEN}$1${NC}"
    echo ""
}

# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================
print_section "🔐 AUTHENTICATION"

print_curl "# Login"
echo "curl -X POST $BASE_URL/auth/login \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"email\": \"admin@filmes.com\", \"senha\": \"admin123\"}'"

print_curl "# Register new user"
echo "curl -X POST $BASE_URL/auth/register \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"nome\": \"Novo Usuário\", \"email\": \"novo@filmes.com\", \"senha\": \"senha123\"}'"

# ============================================================================
# MOVIES ENDPOINTS
# ============================================================================
print_section "🎬 MOVIES"

print_curl "# Get all movies"
echo "curl -X GET $BASE_URL/filmes"

print_curl "# Get movie by ID"
echo "curl -X GET $BASE_URL/filmes/{movie_id}"

print_curl "# Search movies by title"
echo "curl -X GET \"$BASE_URL/filmes/buscar?titulo=matrix\""

print_curl "# Filter movies by genre"
echo "curl -X GET \"$BASE_URL/filmes/genero?genero=Drama\""

print_curl "# Add new movie (Admin only)"
echo "curl -X POST $BASE_URL/filmes \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"titulo\": \"Novo Filme\","
echo "    \"imagemUrl\": \"https://exemplo.com/novo-filme.jpg\","
echo "    \"ano\": 2024,"
echo "    \"generos\": [\"Ação\", \"Aventura\"],"
echo "    \"sinopse\": \"Sinopse do novo filme...\""
echo "  }'"

print_curl "# Update movie (Admin only)"
echo "curl -X PUT $BASE_URL/filmes/{movie_id} \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"titulo\": \"Título Atualizado\","
echo "    \"imagemUrl\": \"https://exemplo.com/atualizado.jpg\","
echo "    \"ano\": 2024,"
echo "    \"generos\": [\"Drama\", \"Suspense\"],"
echo "    \"sinopse\": \"Sinopse atualizada...\""
echo "  }'"

print_curl "# Delete movie (Admin only)"
echo "curl -X DELETE $BASE_URL/filmes/{movie_id} \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

# ============================================================================
# FAVORITES ENDPOINTS
# ============================================================================
print_section "❤️ FAVORITES"

print_curl "# Get user favorites"
echo "curl -X GET $BASE_URL/favoritos \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

print_curl "# Add movie to favorites"
echo "curl -X POST $BASE_URL/favoritos \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{\"filmeId\": \"{movie_id}\"}'"

print_curl "# Remove movie from favorites"
echo "curl -X DELETE $BASE_URL/favoritos/{movie_id} \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

print_curl "# Check if movie is favorited"
echo "curl -X GET $BASE_URL/favoritos/{movie_id} \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

# ============================================================================
# REVIEWS ENDPOINTS
# ============================================================================
print_section "⭐ REVIEWS"

print_curl "# Get reviews for a movie"
echo "curl -X GET $BASE_URL/avaliacoes/filme/{movie_id}"

print_curl "# Add review to movie"
echo "curl -X POST $BASE_URL/avaliacoes \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"filmeId\": \"{movie_id}\","
echo "    \"nota\": 5,"
echo "    \"comentario\": \"Excelente filme! Recomendo muito.\""
echo "  }'"

print_curl "# Update user's review"
echo "curl -X PUT $BASE_URL/avaliacoes/{review_id} \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"nota\": 4,"
echo "    \"comentario\": \"Muito bom, mas poderia ser melhor.\""
echo "  }'"

print_curl "# Delete user's review"
echo "curl -X DELETE $BASE_URL/avaliacoes/{review_id} \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

print_curl "# Get user's reviews"
echo "curl -X GET $BASE_URL/avaliacoes/usuario \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

# ============================================================================
# USER ENDPOINTS
# ============================================================================
print_section "👤 USERS"

print_curl "# Get current user profile"
echo "curl -X GET $BASE_URL/usuarios/perfil \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

print_curl "# Update user profile"
echo "curl -X PUT $BASE_URL/usuarios/perfil \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"nome\": \"Nome Atualizado\","
echo "    \"email\": \"novoemail@filmes.com\""
echo "  }'"

print_curl "# Change password"
echo "curl -X PUT $BASE_URL/usuarios/senha \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"senhaAtual\": \"admin123\","
echo "    \"novaSenha\": \"novaSenha123\""
echo "  }'"

print_curl "# Get all users (Admin only)"
echo "curl -X GET $BASE_URL/usuarios \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\""

# ============================================================================
# COMPLETE WORKFLOW EXAMPLES
# ============================================================================
print_section "🔄 COMPLETE WORKFLOW EXAMPLES"

print_curl "# 1. Login and get JWT token"
echo "TOKEN=\$(curl -s -X POST $BASE_URL/auth/login \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"email\": \"admin@filmes.com\", \"senha\": \"admin123\"}' | \\"
echo "  jq -r '.token')"
echo "echo \"JWT Token: \$TOKEN\""

print_curl "# 2. Get all movies"
echo "curl -X GET $BASE_URL/filmes | jq '.[0:3]'"

print_curl "# 3. Add a movie to favorites"
echo "curl -X POST $BASE_URL/favoritos \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer \$TOKEN\" \\"
echo "  -d '{\"filmeId\": \"{movie_id}\"}'"

print_curl "# 4. Add a review"
echo "curl -X POST $BASE_URL/avaliacoes \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer \$TOKEN\" \\"
echo "  -d '{"
echo "    \"filmeId\": \"{movie_id}\","
echo "    \"nota\": 5,"
echo "    \"comentario\": \"Filme incrível! Recomendo muito.\""
echo "  }'"

print_curl "# 5. Get user favorites"
echo "curl -X GET $BASE_URL/favoritos \\"
echo "  -H \"Authorization: Bearer \$TOKEN\" | jq"

# ============================================================================
# ERROR HANDLING EXAMPLES
# ============================================================================
print_section "⚠️ ERROR HANDLING EXAMPLES"

print_curl "# Invalid login"
echo "curl -X POST $BASE_URL/auth/login \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"email\": \"invalid@email.com\", \"senha\": \"wrongpassword\"}'"

print_curl "# Access protected endpoint without token"
echo "curl -X GET $BASE_URL/favoritos"

print_curl "# Add duplicate favorite"
echo "curl -X POST $BASE_URL/favoritos \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{\"filmeId\": \"{movie_id}\"}'"

print_curl "# Add review with invalid rating"
echo "curl -X POST $BASE_URL/avaliacoes \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -H \"Authorization: Bearer {your_jwt_token}\" \\"
echo "  -d '{"
echo "    \"filmeId\": \"{movie_id}\","
echo "    \"nota\": 7,"
echo "    \"comentario\": \"Invalid rating test\""
echo "  }'"

# ============================================================================
# USEFUL COMMANDS
# ============================================================================
print_section "🛠️ USEFUL COMMANDS"

print_curl "# Save JWT token to variable"
echo "export JWT_TOKEN=\"your_jwt_token_here\""

print_curl "# Test if backend is running"
echo "curl -X GET $BASE_URL/filmes"

print_curl "# Get response headers"
echo "curl -I -X GET $BASE_URL/filmes"

print_curl "# Pretty print JSON response"
echo "curl -X GET $BASE_URL/filmes | jq"

print_curl "# Filter JSON response"
echo "curl -X GET $BASE_URL/filmes | jq '.[] | {titulo, ano, generos}'"

print_curl "# Count total movies"
echo "curl -X GET $BASE_URL/filmes | jq 'length'"

print_curl "# Search and filter"
echo "curl -X GET \"$BASE_URL/filmes/buscar?titulo=drama\" | jq"

echo ""
echo -e "${GREEN}✅ cURL templates ready!${NC}"
echo ""
echo -e "${BLUE}📝 Usage Tips:${NC}"
echo "1. Replace {your_jwt_token} with actual JWT token from login"
echo "2. Replace {movie_id} with actual movie ID from GET /filmes"
echo "3. Replace {review_id} with actual review ID"
echo "4. Install jq for pretty JSON formatting: sudo apt install jq"
echo "5. Use -v flag for verbose output: curl -v -X GET ..."
echo ""
echo -e "${YELLOW}🔧 To run a template:${NC}"
echo "1. Copy the command you want to test"
echo "2. Replace placeholders with actual values"
echo "3. Run in terminal"
echo ""
echo -e "${RED}⚠️  Remember:${NC}"
echo "- Backend must be running on localhost:8080"
echo "- MongoDB must be running and populated"
echo "- JWT tokens expire, re-login if needed" 