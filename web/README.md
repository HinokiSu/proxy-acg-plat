### Proxy Acg Plat Web
> Proxy acg plat: website


### Nginx

```

location /acg {
alias ***path***/dist;
try_files $uri $uri/ /acg/index.html;
index index.html index.htm;
}


```
