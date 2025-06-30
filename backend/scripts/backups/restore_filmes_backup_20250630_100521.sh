#!/bin/bash
# Restore script for backup: filmes_backup_20250630_100521
# Generated on: seg 30 jun 2025 10:05:26 -03

echo "🔄 Restoring database from backup: filmes_backup_20250630_100521"
echo "⚠️  This will overwrite existing data in the 'Filmes' database"
echo ""

read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled."
    exit 1
fi

mongorestore --db=Filmes --drop "backups/filmes_backup_20250630_100521/Filmes"

if [ $? -eq 0 ]; then
    echo "✅ Database restored successfully!"
else
    echo "❌ Error restoring database"
    exit 1
fi
