FROM debian:bullseye

RUN apt-get update && \
    apt-get install -y cron bash procps default-mysql-client && \
    rm -rf /var/lib/apt/lists/*


COPY backup.sh /backup/backup.sh
COPY cronjob /etc/cron.d/cronjob

RUN chmod +x /backup/backup.sh && \
    chmod 0644 /etc/cron.d/cronjob && \
    crontab /etc/cron.d/cronjob

CMD ["cron", "-f"]
