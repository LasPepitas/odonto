#!/bin/bash

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
mysqldump -udeveloper -p124217 odonto > /backup/output/backup_$TIMESTAMP.sql
