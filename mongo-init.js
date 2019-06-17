db.createUser({
  user: 'test',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'api-ping-pub-dev'
    }
  ]
});
