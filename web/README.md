### Proxy Acg Plat Web

> Proxy acg plat: website

#### Usage

##### 1.Need create `.env.production` file in `./web/**`

> refer to `.env.development`

```
 VITE_API_URL = $URL
```

### Nginx

```

location /acg {
alias <$path>/dist;
try_files $uri $uri/ /acg/index.html;
index index.html index.htm;
}


```
