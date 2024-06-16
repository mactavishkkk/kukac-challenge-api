./wait-for-it.sh db:5464 --timeout=60 --strict -- echo "Database is up"

npm run seed

exec "$@"
