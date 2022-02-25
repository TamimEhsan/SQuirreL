<div id="top"></div>


<!-- PROJECT LOGO -->
<br />
<div align="center">

![](public/images/squirrel.png)

<h2 align="center">Squirrel</h3>
  <h3 align="center">Go nuts for books </h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>




<!-- ABOUT THE PROJECT -->
## About The Project

Squirrel is an oracle powered bootstrapped node Website. It is a faithful copy of Rokomari.com. You'll find many features that is in the main site. We tried best of our ability to create something in this short time. 

### Built With :heart: and

- Nodejs
- EJS
- Bootstrap
- OracleDB

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow the step by step installation procedure to install and run this on your machine

### Prerequisites

Make sure you have node and oracle installed in your device.

**`NodeJs`**: Install Nodejs from [here](https://nodejs.org/en/download/)

**`Oracle`**:Install Oracle from [here](http://www.oracle.com/index.html) and register for an account of your own



### Installation

#### Getting the repository

1. Clone the repo
   ```sh
   git clone https://github.com/TamimEhsan/SQuirreL.git
   ```

2. If you don't have git installed in your device then download zip

3. After installation or download go to the repository and open command line.

4. Install NPM packages

   ```sh
   npm install
   ```



#### Setting up the database

1. Go to sql plus

2. Enter credentials

   ```sh
   username: sys as sysdba
   password: password
   ```

3.  Create a new user c##squirrel

   ```sh
   create user c##squirrel identified by password;
   grant dba to c##squirrel;
   ```

   

4. Find file dump.sql in `sql/SQL_DUMP.sql`

5. Head over to your favourite database GUI and connect squirrel with that

6. Import data from sql file depending upon the GUI. 

7. The DUMP should work i hope 😩

8. If no errors are shown we are good to go!



#### Setting up the environment variables

create a new file `.env` in the root directory. And the file should have the followings

```sh
DB_USER= YOUR_DB_USER 
DB_PASS= YOUR_DB_PASS
DB_CONNECTSTRING=localhost/orcl
PORT=YOUR_FABOURITE_PORT
APP_SECRET=YOUR_DARKEST_SECRET
```

If you followed the above then the `.env` should look like this

```sh
DB_USER= c##squirrel 
DB_PASS= password
DB_CONNECTSTRING=localhost/orcl
PORT= 3000
APP_SECRET=iLoveSquirrel
```



#### Getting the big static data

We are almost done. As there are size restrictions of files, we couldn't upload the images in github 😪. So go to  :arrow_forward: [drive](https://drive.google.com/file/d/1P9d5But_VUcviEykeNlIUvejf0JQnAQY/view?usp=sharing) :arrow_backward: and download the images. paste the folder in public/images. The directory tree should be like this

```sh
SQuirreL/
├─ middlewares/
├─ public/
│  ├─ css/
│  ├─ images/
│  │  ├─ books/
│  │  │  ├─ 10000001.jpg
│  │  │  ├─ 10000002.jpg
│  │  │  ├─ ...
│  │  ├─ favicon.png
│  │  ├─ ...
│  ├─ scripts/
├─ router/

```

We are finally good to go

#### Run the project

Go to your favourite code editor and run

```sh
npm run dev
```

You should find that the project is working!

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contributors

- **Md. Tamimul Ehsan** - 1805022

- **Sachin Deb** - 1805020

  

## Supervisor

- Dr. Rifat Shahriyar (রিফাত শাহরিয়ার)

  - **Professor**

    :arrow_forward:  **Contact:**

    Department of Computer Science and Engineering
    Bangladesh University of Engineering and Technology
    Dhaka-1000, Bangladesh

    :arrow_forward:   **Homepage:**

    [http://rifatshahriyar.github.io/](http://rifatshahriyar.github.io/)

<p align="right">(<a href="#top">back to top</a>)</p>


