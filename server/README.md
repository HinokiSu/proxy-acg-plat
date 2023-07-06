Proxy Acg Plat Server
> proxy acg platform: server

```json
{
  "DataBasePath": "***$Path***\\resources\\database\\acg_db.db",
  "Port": "***$Port***",
  "SecretKey": "***$Key***",
  "UploadPath": "***$Path***",
  "ImgFilePathPrefix": "***$URL***"
}
```

### Nginx

```
location /api/ {
    proxy_pass http://localhost:***Port***/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

```
