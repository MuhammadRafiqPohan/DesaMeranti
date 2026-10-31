#!/bin/sh
set -e

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Run migrations and seeders automatically
php artisan migrate --force
php artisan db:seed --force

# Cache routes and config for production performance
php artisan config:cache || true
php artisan route:cache || true

exec /usr/bin/supervisord -c /etc/supervisord.conf
