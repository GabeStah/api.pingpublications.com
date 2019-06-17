#!/usr/bin/env bash
mongo -- "${DB_ROOT_NAME}" <<EOF
var adminUser = "${DB_ROOT_USERNAME}";
var adminPassword = "${DB_ROOT_PASSWORD}";
var user = "${DB_USERNAME}";
var password = "${DB_PASSWORD}";
adminDb.auth(adminUser, adminPassword);
var api = db.getSiblingDB("${DB_NAME}");
api.createUser({user: user, pwd: password, roles: [{ role: "readWrite", db: "${DB_NAME}" }]});
EOF
