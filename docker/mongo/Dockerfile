#
# MongoDB Dockerfile
#

# Pull base image.
FROM mongo:latest

# Initialize user and database.
COPY init.js /docker-entrypoint-initdb.d/
