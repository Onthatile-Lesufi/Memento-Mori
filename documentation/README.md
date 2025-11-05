# Memento Mori
## Table of Contents
 - [Overview](#overview)
 - [Services](#services)
    - [Page Breakdown](#page-breakdown)
 <!-- - [Data Visualisation](#data-visualisation) -->

 - [Deployment](#deployment)
 - [Search Engine Optimisation](#search-engine-optimisation)
 - [Built With](#built-with)
 - [Acknowledgements](#acknowledgements)

## Overview

Memento Mori is a repository of graves, graveyards, cemeteries and memorials all across the country of South Africa.

## Services
### Page Overview

#### Home
The landing page of the website. Provides a quick overview of the site's services and links to log into the site.

![Home Page](/documentation/Screenshots/home.png)

#### About

A page dedicated to providing a quick overview of the site, its services and its creation.

![About Page](/documentation/Screenshots/about.png)

#### FAQ

A page that attempts to answer frequently asked questions without the need for the user to contact admins

![FAQ Page](/documentation/Screenshots/faq.png)

#### Browse

A page that can be accessed via the search bar in the navigation bar. Will show results for search queries.

![Browse Page](/documentation/Screenshots/browse.png)

#### Grave

The page used to comment on/report/save individual graves

![Grave Page](/documentation/Screenshots/grave.png)

#### Graveyard

A page with a collection of graves that are all buried or memorialised at a certain site.

![Graveyard Page](/documentation/Screenshots/graveyard.png)

#### Log In/Sign Up

Pages that users can use to either register a new account on the site or log in with an existing account to access more features of the site.

![Log Page](/documentation/Screenshots/login.png)
![Sign Page](/documentation/Screenshots/signup.png)

#### Contribute

A page with two with each allowing users generate new graves and graveyards for the site respectively.

![Grave Contribute Page](/documentation/Screenshots/graveContribute.png)
![Graveyard Contribute Page](/documentation/Screenshots/yardContribute.png)

#### Audit

A page that can only be accessed by site admins. Is used to approve or delete new or updated graves.

![Audit Page](/documentation/Screenshots/audit.png)

#### Edit

The page used to edit information related to grave.

![Edit Page](/documentation/Screenshots/edit.png)

<!-- ## Data Visualisation
 -->

## Deployment

For the near future, Memento Mori is currently deployed using Heroku. Aside from the domain provided by Heroku, Memento Mori is also being deployed at https://mementomorisa.co.za.

Heroku was the platform of choice as it is specifically designed for prototyping. Where Heroku lacks in flexibility compared to other depolyment platforms such as AWS and Azure, it makes up for in a quick start-up process plus easy deployment through the use of a git bash terminal or seamless integration with Github. One added benefit of this Github integration is that it allows easy auto deployment. Meaning that features and bug fixes can be pushed onto the site as soon as they have been pushed onto the github project's production branch.

Heroku also provides numerous add-ons for database deployment. For this site, JawsDB was used instead of Heroku's built-in SQL database hosting, Postgres. This was done as JawsDB provides a free tier deployment option that provide ample services for the site's needs.

## Personal Deployment

### Prerequisites

- Node.js (v14+)
- npm
- [SQL database]() (Imported into phpmyadmin or MySQL Workbench)
- Git

### How to Install

1. **Clone the Repository**

```bash
git clone https://github.com/Onthatile-Lesufi/Memento-Mori
```

2. **Open The Repository**

3. **Install Frontend**

3.1. Open a new terminal then input the following:

```bash
cd frontend
npm install
npm start
```

4. **Install Backend** 

4.1. Open a new terminal then input the following:

```bash
cd backend
npm install
npm start
```


## Search Engine Optimisation

During this website's deployment period, I wish to see my website get used. Obviously sharing it amongst friends can be valuable but in order to measure your actual skills you will need to ensure that people all over the website's particular region. That is where SEO comes in the picture.

One of the easiest boosts to SEO adding keywords. For Memeto Mori the keywords look thusly:

```HTML
<meta name="keywords" content="Memento Mori,Memento Mori SA,Memento Mori ZA, Memento Morisa, Memento Moriza,Memento Mori South Africa,Graves, Graveyards, Cemeteries, Memorials, South Africa, South African Dead,South African Deceased, South African Memorials,South African Memorials, South African Cemeteries,South African Cemetery,South African Graveyards,South African Graves,South African Graveyard,South African Grave, Cape Town Dead, Cape Town Deceased, Cape Town Memorials, Cape Town Memorials, Cape Town Cemeteries, Cape Town Cemetery, Cape Town Graveyards, Cape Town Graves, Cape Town Graveyard, Cape Town Grave, Joburg Dead, Joburg Deceased, Joburg Memorials, Joburg Memorials, Joburg Cemeteries, Joburg Cemetery, Joburg Graveyards, Joburg Graves, Joburg Graveyard, Joburg Grave, Johannesburg Dead, Johannesburg Deceased, Johannesburg Memorials, Johannesburg Memorials, Johannesburg Cemeteries, Johannesburg Cemetery, Johannesburg Graveyards, Johannesburg Graves, Johannesburg Graveyard, Johannesburg Grave, Durban Dead, Durban Deceased, Durban Memorials, Durban Memorials, Durban Cemeteries, Durban Cemetery, Durban Graveyards, Durban Graves, Durban Graveyard, Durban Grave, Limpopo Dead, Limpopo Deceased, Limpopo Memorials, Limpopo Memorials, Limpopo Cemeteries, Limpopo Cemetery, Limpopo Graveyards, Limpopo Graves, Limpopo Graveyard, Limpopo Grave, KZN Dead, KZN Deceased, KZN Memorials, KZN Memorials, KZN Cemeteries, KZN Cemetery, KZN Graveyards, KZN Graves, KZN Graveyard, KZN Grave, Westpark Cemetery, Fourways Memorial, Nasrec Memorial, Avalon">
```

When developing this site one of the first potential hurdle that became evident was the one page nature of the site compounded by the use of the hash router which makes it difficult for query bots to effectively scrape the site for every applicable endpoint.

One way that I could move towards a solution to this issue was to update robots.txt:

```txt robots
User-agent: *
Allow: /#/*
Disallow: /#/user/*
Disallow: /#/browse/*
Disallow: /#/contribute
Disallow: /#/audit
```

At the time of writing I am still struggling to setup indexing for any route aside from the landing page. However I was still able to obtain these metrics from Google Analytics.

The following metric are accurate to https://mementomorisa.co.za as of 5 November 2025 at 01:51am Central African Time:

![user-info](/documentation/Screenshots/user-snpashot.png)
![new-info](/documentation/Screenshots/new-snapshot.png)
![country-info](/documentation/Screenshots/country-snpashot.png)

## Built With
### Front End
  ![https://img.shields.io/badge/React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![https://img.shields.io/badge/Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

  The frontend of Memento Mori was made using React and Bootstrap. 
  
  This framework and library combination allows for the quick and comprehensive development of the site' frontend.

  This combination also made responsive development easier as:
  - JSX can be used to dynamically update components that are attached to certain window events such as size checks
  - Many bootstrap components already come with their own styling which will typically involve response styling such as the col system

These benefits alongside regular css responsiveness easy to do.

  ![https://img.shields.io/badge/React_Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

  React Router allows for the dynamic creation and navigation between endpoints of the website's frontend.This allows for multi page websites that can be served on one static html file. 
  
  The dynamic/single file nature of React Router can lead to issues with cloud hosting service that might attempt to serve non-existent html files. However, React Router also provides a solution for this issue in the form of the hash router.

  One drawback to making use of the hash router is that it makes SEO a bit tricky to work with as the hash router makes it hard for Google to scrape your individual pages.

### Back End
  ![https://img.shields.io/badge/MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

  For the website's back end CRUD functionality and database management, MySQL was chosen.

  ![https://img.shields.io/badge/Expresss%20js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![https://img.shields.io/badge/Expresss%20Session](https://img.shields.io/badge/Express%20Session-000000?style=for-the-badge&logo=express&logoColor=white)

  In order to interact with the database, the site makes use of an Express JS api that can be used in conjunction Axios to allow for seamless communication between the front end and the back end.
  
  As an added layer of security for the site, session based authentication was used to control access various parts for the site including the deletion, editing and creation of database entries. For this reason Express becomes extra valuable it provides seamless session based authentication.

  ![https://img.shields.io/badge/Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)
  ![https://img.shields.io/badge/Bcrypt](https://img.shields.io/badge/Multer-3511ff?style=for-the-badge)

  For uploading media to the site's a conjunction of both Multer and Cloudinary is used. 
  
  The Multer middleware is used to allow the backend to receive any images sent by the frontend. This is useful as Multer also allows for the uploading multiple images which may be added at a later date.

  The content received by Multer can then be uploaded to Cloudinary which can then store the media and provide a link then be used to load the image securely.

  ![https://img.shields.io/badge/Bcrypt](https://img.shields.io/badge/Bcrypt-dd1100?style=for-the-badge)

  One consideration, in terms of security, was encryption. For this purpose, the site makes use of becrypt to encrypt passwords. 

  Becrypt is used as its form of encryption involves hashing which makes it extremely hard for bad faith actors to attempt to get the sensitive information.

### Deployement
![https://img.shields.io/badge/Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

Heroku was the platform of choice as it is specifically designed for prototyping. Where Heroku lacks in flexibility compared to other depolyment platforms such as AWS and Azure, it makes up for in a quick start-up process plus easy deployment through the use of a git bash terminal or seamless integration with Github. One added benefit of this Github integration is that it allows easy auto deployment. Meaning that features and bug fixes can be pushed onto the site as soon as they have been pushed onto the github project's production branch.

Heroku also provides numerous add-ons for database deployment. For this site, JawsDB was used instead of Heroku's built-in SQL database hosting, Postgres. This was done as JawsDB provides a free tier deployment option that provide ample services for the site's needs.

### Testing

![https://img.shields.io/badge/Node%20js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

For the purpose of testing, the site makes use of Node JS. This is because Node allows for easy and quick local deployment of both back end and front end server, thus allowing for the testing of the site without needing to deploy the site publicly or through a dedicated server rig.

Unrelated to testing, NodeJS was the primary tool in this site's creation as provides an entire library of frameworks, middleware, libraries and resources through the use of npm.

## Contributors
 - Tsungai Katsuro - https://github.com/TsungaiKats

## Acknowledgements

- Microsoft copilot was used for the generation of some of the copywrite on the home page and faq section
- The structure of the site was dictated by my teacher, [Tsungai Katsuro](https://github.com/TsungaiKats)
-Stack Overflow was a great help for the debugging process

## Extra Resources

Walkthrough Video - [Link](https://drive.google.com/file/d/1fsm_lRcRdM_LyLd9CEWWtgKjm3aGF6ys/view?usp=sharing)