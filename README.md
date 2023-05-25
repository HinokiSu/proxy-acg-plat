

`Nginx`
```
    # web
	location /acg {
		alias /srv/proxy-acg-plat/web/dist;
		try_files $uri $uri/ /acg/index.html;
		index index.html index.htm;
	}

```

```
    # server
	location /api/ {
		proxy_pass http://localhost:5100/;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
```


`Whole Nginx config`
```
server {
	listen 127.0.0.1:31300;
	server_name www.yukihino.top;
#	root /usr/share/nginx/html;
	location /s/ {
		add_header Content-Type text/plain;
		alias /etc/v2ray-agent/subscribe/;
	}
	location / {
		root /usr/share/nginx/html;
		add_header Strict-Transport-Security "max-age=15552000; preload" always;
	}

	location /acg {
		alias /srv/proxy-acg-plat/web/dist;
		try_files $uri $uri/ /acg/index.html;
		index index.html index.htm;
#		try_files $uri $uri/ @router;
	}
	
#	location @router {
#		rewrite ^.*$ /index.html last;
#	}

	location /api/ {
		proxy_pass http://localhost:5100/;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection 'upgrade';
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}



}
```