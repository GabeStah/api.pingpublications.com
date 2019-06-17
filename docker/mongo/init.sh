#!/usr/bin/env bash
mongo -- "${DB_ROOT_NAME}" <<EOF
var adminUser = "${DB_ROOT_USERNAME}";
var adminPassword = "${DB_ROOT_PASSWORD}";
var apiUser = "${DB_USERNAME}";
var apiPassword = "${DB_PASSWORD}";
adminDb.auth(adminUser, adminPassword);
#var adminDb = db.getSiblingDB("${DB_ROOT_NAME}");
#adminDb.createUser({user: "${DB_USERNAME}", pwd: "${DB_PASSWORD}", roles: [{ role: "readWrite", db: "${DB_NAME}" }]});
var apiDB = db.getSiblingDB("${DB_NAME}");
apiDB.createUser({user: apiUser, pwd: apiPassword, roles: [{ role: "readWrite", db: "${DB_NAME}" }]});
EOF
