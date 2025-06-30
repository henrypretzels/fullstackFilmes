#!/bin/bash

# Script to populate the filmes database with sample data
# Make sure MongoDB is running and the Filmes database exists

echo "🎬 Populating Film Catalog Database..."
echo ""

# Check if mongosh is available
if ! command -v mongosh &> /dev/null; then
    echo "❌ Error: mongosh is not installed or not in PATH"
    echo "Please install MongoDB Shell (mongosh) first"
    exit 1
fi

# Run the population script
mongosh Filmes populate-database.js

echo ""
echo "🎉 Database population completed!"
echo ""
echo "📋 Next steps:"
echo "1. Start your Spring Boot backend: ./mvnw spring-boot:run"
echo "2. Start your Vue.js frontend: npm run dev"
echo "3. Login with any of the created users (password: admin123)"
echo ""
echo "👤 Available users:"
echo "   - admin@filmes.com (Admin)"
echo "   - teste@filmes.com"
echo "   - ryder@filmes.com"
echo "   - colton@filmes.com"
echo "   - maria@filmes.com"
echo "   - joao@filmes.com"
echo "   - ana@filmes.com"
echo "   - pedro@filmes.com" 