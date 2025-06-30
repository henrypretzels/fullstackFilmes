#!/bin/bash

# MongoDB Export Script for Film Catalog Database
# This script exports all collections as JSON files for easy backup and portability

# Configuration
DB_NAME="Filmes"
EXPORT_DIR="exports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
EXPORT_NAME="filmes_export_$TIMESTAMP"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📤 MongoDB Export Script${NC}"
echo "================================"
echo ""

# Check if mongoexport is available
if ! command -v mongoexport &> /dev/null; then
    echo -e "${RED}❌ Error: mongoexport is not installed or not in PATH${NC}"
    echo "Please install MongoDB Database Tools first:"
    echo "  Ubuntu/Debian: sudo apt install mongodb-database-tools"
    echo "  macOS: brew install mongodb/brew/mongodb-database-tools"
    echo "  Windows: Download from https://www.mongodb.com/try/download/database-tools"
    exit 1
fi

# Create export directory if it doesn't exist
if [ ! -d "$EXPORT_DIR" ]; then
    mkdir -p "$EXPORT_DIR"
    echo -e "${GREEN}✅ Created export directory: $EXPORT_DIR${NC}"
fi

# Create timestamped export directory
EXPORT_PATH="$EXPORT_DIR/$EXPORT_NAME"
mkdir -p "$EXPORT_PATH"

echo -e "${YELLOW}📊 Exporting database: $DB_NAME${NC}"
echo -e "${YELLOW}📁 Export location: $EXPORT_PATH${NC}"
echo ""

# Check if database exists and has collections
echo -e "${BLUE}🔍 Checking database status...${NC}"
COLLECTIONS=$(mongosh --quiet --eval "db.getCollectionNames().join('\n')" $DB_NAME 2>/dev/null)

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error: Could not connect to MongoDB or database '$DB_NAME' does not exist${NC}"
    echo "Make sure MongoDB is running and the database exists."
    exit 1
fi

if [ -z "$COLLECTIONS" ]; then
    echo -e "${YELLOW}⚠️  Database '$DB_NAME' exists but has no collections${NC}"
    echo "This might be a fresh database. Export will still be created."
else
    echo -e "${GREEN}✅ Found collections in database${NC}"
    echo ""
    
    # Export each collection
    echo -e "${BLUE}📤 Exporting collections...${NC}"
    for collection in $COLLECTIONS; do
        if [ ! -z "$collection" ]; then
            echo -n "  Exporting $collection... "
            
            # Get document count
            COUNT=$(mongosh --quiet --eval "db.$collection.countDocuments()" $DB_NAME 2>/dev/null)
            
            # Export collection
            mongoexport --db=$DB_NAME --collection=$collection --out="$EXPORT_PATH/${collection}.json" --pretty 2>/dev/null
            
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ ($COUNT documents)${NC}"
            else
                echo -e "${RED}❌ Failed${NC}"
            fi
        fi
    done
fi

echo ""
echo -e "${GREEN}✅ Export completed successfully!${NC}"
echo ""
echo -e "${BLUE}📊 Export Summary:${NC}"
echo "  Database: $DB_NAME"
echo "  Location: $EXPORT_PATH"
echo "  Timestamp: $TIMESTAMP"
echo ""

# Show export contents
if [ -d "$EXPORT_PATH" ]; then
    echo -e "${BLUE}📁 Exported files:${NC}"
    ls -la "$EXPORT_PATH/"
    echo ""
    
    # Show file sizes
    echo -e "${BLUE}📏 File sizes:${NC}"
    for file in "$EXPORT_PATH"/*.json; do
        if [ -f "$file" ]; then
            size=$(du -h "$file" | cut -f1)
            filename=$(basename "$file")
            echo "  - $filename: $size"
        fi
    done
    echo ""
fi

# Create an import script
IMPORT_SCRIPT="$EXPORT_PATH/import_$EXPORT_NAME.sh"
cat > "$IMPORT_SCRIPT" << EOF
#!/bin/bash
# Import script for export: $EXPORT_NAME
# Generated on: $(date)

echo "📥 Importing database from export: $EXPORT_NAME"
echo "⚠️  This will overwrite existing data in the '$DB_NAME' database"
echo ""

read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! \$REPLY =~ ^[Yy]$ ]]; then
    echo "Import cancelled."
    exit 1
fi

# Import each collection
for file in *.json; do
    if [ -f "\$file" ]; then
        collection=\$(basename "\$file" .json)
        echo "Importing \$collection..."
        mongoimport --db=$DB_NAME --collection=\$collection --file="\$file" --drop
    fi
done

echo "✅ Database imported successfully!"
EOF

chmod +x "$IMPORT_SCRIPT"
echo -e "${GREEN}✅ Import script created: $IMPORT_SCRIPT${NC}"

# Create a README file
README_FILE="$EXPORT_PATH/README.md"
cat > "$README_FILE" << EOF
# MongoDB Export - $EXPORT_NAME

**Generated on:** $(date)

**Database:** $DB_NAME

## Files

- \`*.json\` - Collection data in JSON format
- \`import_$EXPORT_NAME.sh\` - Script to import this data back to MongoDB

## Import Instructions

1. Make sure MongoDB is running
2. Run the import script: \`./import_$EXPORT_NAME.sh\`
3. The script will ask for confirmation before importing

## Manual Import

To import a specific collection manually:

\`\`\`bash
mongoimport --db=Filmes --collection=filmes --file=filmes.json --drop
\`\`\`

## Notes

- The \`--drop\` flag will remove existing data before importing
- JSON files are in pretty-printed format for readability
- Each file contains one collection's data
EOF

echo -e "${GREEN}✅ README file created: $README_FILE${NC}"

echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Your current data is exported as JSON files"
echo "2. You can now run the population script: ./run-populate.sh"
echo "3. To import this export later, run: $IMPORT_SCRIPT"
echo ""
echo -e "${YELLOW}💡 Benefits of JSON export:${NC}"
echo "  - Human-readable format"
echo "  - Easy to edit manually"
echo "  - Portable across different MongoDB versions"
echo "  - Can be used for data analysis or migration"
echo ""
echo -e "${YELLOW}💡 Tip: You can also export specific collections:${NC}"
echo "   mongoexport --db=Filmes --collection=filmes --out=filmes.json --pretty"
EOF 