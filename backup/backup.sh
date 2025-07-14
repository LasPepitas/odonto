#!/bin/bash

TIMESTAMP=$(date +"%Y%m%d%H%M%S")
BACKUP_DIR="/backup/output"
mkdir -p "$BACKUP_DIR"

mysqldump -h mysql -u root -proot odonto > "$BACKUP_DIR/backup_$TIMESTAMP.sql"
