#!/bin/bash

# MongoDB Backup Script for Film Catalog Database
# This script creates a backup of all collections in the Filmes database

# Configuration
DB_NAME="Filmes"
BACKUP_DIR="backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="filmes_backup_$TIMESTAMP"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🗄️  MongoDB Backup Script${NC}"
echo "================================"
echo ""

# Check if mongodump is available
if ! command -v mongodump &> /dev/null; then
    echo -e "${RED}❌ Error: mongodump is not installed or not in PATH${NC}"
    echo "Please install MongoDB Database Tools first:"
    echo "  Ubuntu/Debian: sudo apt install mongodb-database-tools"
    echo "  macOS: brew install mongodb/brew/mongodb-database-tools"
    echo "  Windows: Download from https://www.mongodb.com/try/download/database-tools"
    exit 1
fi

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo -e "${GREEN}✅ Created backup directory: $BACKUP_DIR${NC}"
fi

echo -e "${YELLOW}📊 Creating backup of database: $DB_NAME${NC}"
echo -e "${YELLOW}📁 Backup location: $BACKUP_DIR/$BACKUP_NAME${NC}"
echo ""

# Check if database exists and has collections
echo -e "${BLUE}🔍 Checking database status...${NC}"
COLLECTION_COUNT=$(mongosh --quiet --eval "db.getCollectionNames().length" $DB_NAME 2>/dev/null)

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error: Could not connect to MongoDB or database '$DB_NAME' does not exist${NC}"
    echo "Make sure MongoDB is running and the database exists."
    exit 1
fi

if [ "$COLLECTION_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Database '$DB_NAME' exists but has no collections${NC}"
    echo "This might be a fresh database. Backup will still be created."
else
    echo -e "${GREEN}✅ Found $COLLECTION_COUNT collection(s) in database${NC}"
    
    # List collections
    echo -e "${BLUE}📋 Collections found:${NC}"
    mongosh --quiet --eval "db.getCollectionNames().forEach(print)" $DB_NAME 2>/dev/null | while read collection; do
        if [ ! -z "$collection" ]; then
            COUNT=$(mongosh --quiet --eval "db.$collection.countDocuments()" $DB_NAME 2>/dev/null)
            echo "  - $collection: $COUNT document(s)"
        fi
    done
fi

echo ""

# Create backup
echo -e "${YELLOW}🔄 Creating backup...${NC}"
mongodump --db=$DB_NAME --out="$BACKUP_DIR/$BACKUP_NAME"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backup created successfully!${NC}"
    echo ""
    echo -e "${BLUE}📊 Backup Summary:${NC}"
    echo "  Database: $DB_NAME"
    echo "  Location: $BACKUP_DIR/$BACKUP_NAME"
    echo "  Timestamp: $TIMESTAMP"
    echo ""
    
    # Show backup contents
    if [ -d "$BACKUP_DIR/$BACKUP_NAME/$DB_NAME" ]; then
        echo -e "${BLUE}📁 Backup contents:${NC}"
        ls -la "$BACKUP_DIR/$BACKUP_NAME/$DB_NAME/"
        echo ""
    fi
    
    # Create a restore script
    RESTORE_SCRIPT="$BACKUP_DIR/restore_$BACKUP_NAME.sh"
    cat > "$RESTORE_SCRIPT" << EOF
#!/bin/bash
# Restore script for backup: $BACKUP_NAME
# Generated on: $(date)

echo "🔄 Restoring database from backup: $BACKUP_NAME"
echo "⚠️  This will overwrite existing data in the '$DB_NAME' database"
echo ""

read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! \$REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled."
    exit 1
fi

mongorestore --db=$DB_NAME --drop "$BACKUP_DIR/$BACKUP_NAME/$DB_NAME"

if [ \$? -eq 0 ]; then
    echo "✅ Database restored successfully!"
else
    echo "❌ Error restoring database"
    exit 1
fi
EOF
    
    chmod +x "$RESTORE_SCRIPT"
    echo -e "${GREEN}✅ Restore script created: $RESTORE_SCRIPT${NC}"
    
else
    echo -e "${RED}❌ Error creating backup${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Your current data is safely backed up"
echo "2. You can now run the population script: ./run-populate.sh"
echo "3. To restore this backup later, run: $RESTORE_SCRIPT"
echo ""
echo -e "${YELLOW}💡 Tip: You can also create a manual backup anytime with:${NC}"
echo "   mongodump --db=Filmes --out=backups/manual_backup_\$(date +%Y%m%d_%H%M%S)" 