# EVO BLOG

This blog was created in order to practice Vue and Bootstrap 4.  It is intended to better my skills in, and demonstrate ability of
- Vue 2
- Vue-router
- Vuex
- webpack
- babel
- Bootstrap 4
- SASS


## Usage

Before starting, please make sure **MySQL**, **NodeJS**, and **SASS** are installed on your local machine.

Install the required node modules
```sh
$ npm install
```

#### Backend Setup
Firstly configure and run the backend server for this blog as describe on its [project page](https://github.com/gorgila/evo-mysql-api).

#### Running

To run the **development** build, use the command
```sh
$ npm run dev
```

To run the **production** build, use the command
```sh
$ npm run build
```

The **user frontend** can be accessed at `http://localhost:8088`.  The **admin backend** can be accessed at `http://localhost:8088/backend`.



------------
#### ACKNOWLEDGEMENTS

This project is based on [lincenying's project](https://github.com/lincenying/mmf-blog-vue2) (as of October 2017).  Major changes to the project include:
- Redeveloped the entire interface to use Bootstrap 4.
- Restructured the project for maintainability.
- Modified the theme, including adding the ability to switch between day and night modes.

------------
#### LICENSE

MIT