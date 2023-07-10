Proxy Acg Plat Server

> proxy acg platform: server

### Usage

#### 1. Need create `server.config.dev.json` and `server.config.json` in `./server/**`

> The file format is displayed as follows

```json
{
  "DataBasePath": "<$Path>\\resources\\database\\acg_db.db",
  "Port": "<$Port>",
  "SecretKey": "<$Key>",
  "UploadPath": "<$Path>",
  "ImgFilePathPrefix": "<$URL>"
}
```

### Nginx

```json
location /api/ {
    proxy_pass http://localhost:<$Port>/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

```

### Api

#### Torrent 
##### `/torrent/pagin`

- `GET`

- Param:

  ```
  curpage: 1
  pagesize: 20
  ```

- Return:

  ```json
  {
      data: {
          list: [{…},{…},…],
          total: 3405
      },
      msg: "Info: Get Torrent by pagination success",
      status: 200
  }
  ```

  > `list`:  The element object is of torrent type

##### `/torrent/search`

- `GET`

- Param

  ```
  curpage: 1
  pagesize: 20
  keyword: s
  anime: 
  ```
  
  > `keyword` and `anime`  can **only** be selected one of two
  >
  > `anime`: it is anime _id

- return 

  ```json
  {
      data: {
          list: [{…},{…},…]
          total: 3405
      },
      msg: "Info: Fuzzy search torrent title success",
      status: 200
  }
  ```

  

#### Anime

##### `/anime/`week

- `GET`

- Param

  ```
  week: 1
  ```

  > day of week

- Return 

  ```json
  {
      data: {
          list: [{…},{…},…]
      },
      msg: "Info: Get anime info by week",
      status: 200
  }
  ```

  > `list`:  The element object is of anime type

##### `/anime/all`

- `GET`

- Param

  ```
  time: 2023/07/01
  ```

- Return

  ```json
  {
      data: {
          total: 31
          list: [{…},{…},…]
      },
      msg: "Info: ",
      status: 200
  }
  ```



##### `/anime/id`

- `GET`

- Param

  ```
  id: cc0c3611-ae07-4387-9dc0-ea9e66fa41ef
  ```

- Return

  ```json
  {
      data: {
         anime: {}
      },
      msg: "Info: ",
      status: 200
  }
  ```

  `anime`:  The object is of anime type



##### `/anime/update`

- `POST`

- Header

  ```
  Authorization:"<$Token>"
  ```

- Body:

  ```
  _id: 95704267-715a-4eb2-b42c-ee035ab85c66
  zh_name: sss
  en_name: 
  img: 
  update_at: 2023-07-10T06:14:38.928Z
  ```

- Return 

  ```json
  {
      data: {},
      msg: "Info: Update anime success",
      status: 200
  }
  ```

  

##### `/anime/add`

- `POST`

- Header

    ```
    Authorization:"<$Token>"
    ```

- Body:

  ```
  _id: 
  origin_id: 
  zh_name: 
  ja_name: Test1
  en_name: 
  start_date: 2023/07/01 00:00:00
  end_date: 2023/10/01 00:00:00
  credit: 
  img: 
  create_at: 2023-07-10T06:16:58.484Z
  update_at: 
  start_week: 6
  ```

  > The body object type is anime



##### `/anime/upload`

- `POST`

- Header

  ```
  Authorization:"<$Token>"
  ```

  

- Body

  > form-data

  ```
  file: <binary>
  ```

- Return 

  ```json
  {
      file:{
              fieldname: "file",
              originalname: "20230528_230408.jpg", 
              encoding: "7bit", 
              mimetype: "image/jpeg",
              destination:"",
              encoding:"7bit",
              fieldname:"file",
              filename:"1688970016634.jpg",
              mimetype:"image/jpeg",
              originalname:"20230528_230408.jpg",
              path:"",
              remote: "",
              size: 382663
      }
      msg: "Info: File upload received success",
      status: 200
  }
  ```

  

##### `/anime/delete/id`

- `POST`

- Header

  ```
  Authorization:"<$Token>"
  ```

  

- Body

  > `x-www-form-urlencoded`

  ```
  id:d3524ae0-24a5-4f37-925a-f7baff143b0a
  ```

- Return

  ```
  {
      data: {},
      msg: "Info: Delete anime success",
      status: 200
  }
  ```

  



#### User

##### `/user/login`

- `POST`

- Body:

  ```
  email: user@example.com
  password: userpwd
  ```

- Return:

  ```json
  {
      data: {
          token: "",
          user: {
              _id: "",
              email: "",
              name: "",
              role: "",
          }
      },
      msg: "Info: Get quarter success",
      status: 200
  }
  ```

  





#### Types

##### Torrent

```typescript
interface ITorrent {
  _id: string
  origin_id: string
  title: string
  team_id: string
  publish_time: string
  size: string
  magnet: string
  create_at: string
  update_at: string
}
```



##### Anime

```typescript
type TAnime = {
  _id: string
  origin_id: string
  zh_name: string
  ja_name: string
  en_name: string
  start_date: string
  end_date: string
  credit: string
  img: string
  create_at: string
  update_at: string
  start_week: number
}
```



##### User

```typescript
interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: string
  create_at: string
}
```

