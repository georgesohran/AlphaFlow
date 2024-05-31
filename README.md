
# AlphaFlow

*Productivity website, and also my final project for cs50web*

## Idea and Functions

This is a productivity website for taking notes, making day schedule, and setting goals. 

### Schedule

The most important and impressive function of my websit is it's schedule. You can make your personal schedule by createing onetime events, weekly events, and event daily events there. Than you can click on already existing event, to edit it in a special sidebar

### Notes

You can take notes, delete and edit them, all on one Dashboard page. It is the simplest aspect of my app, wich i am going to change later, to match the complexity of some other features. 

### Goals

On a dedicated /goals page you can set, edit and delete goals. To make it more interactive, I added the ability to create tasks for every goal. The task can be in four stages: Delayed, TODO, In Progress, Done. 

## Distinctiveness and Complexity

This web application is not a social media platform, nither an e-commerce, it is a productivity website, as I mentioned earlier. Currently my webapp has 8 models in my backend, and I tried my best to make the design responsive for mobile devices using tailwind css. 

Speaking about complexity, I decided to use javascript React framework for frontend here, so I can advance my learning skills and become familiar with one of the most popuar technologies of the web development.

However, with using React as my frontend came significant challenges. One of the most important questions I had to answer and a difficult problem to be solved was, how to pair React frontend with Django Backend. I decided to put my frontend folder inside my main project folder with manage.py file, and by editing my settings.py, serve the index.html from frontend build as a tamplate and my bundled js and css code as static files.

## Files and their contents

### Root directory

In the root directory of my github repository you can find my gitignore, readme and my main projects directory /AlphaFlow

### Main project directory
In my project's directory there are subdirectories for my settings configuration [/AlphaFlow](#alphaflow-1), for my api code and database [/api](#api) and for frontend rect code [/frontned](#frontend). Also this is the directory where you can find requirements.txt and manage.py files.

### /AlphaFlow

Here you you can find settings.py file containing all settings for django backend project. Also there is a urls.py file with configuration to make react router work with django backend.

### /api

This directory contains my models,sit admin settings, serializer and most importantly views.py, where, utilizing django rest framework, i created the api.

### /frontend

Here are all my frontend files, including index.html, as my tamplate vite config file, tailwind config file, packege-lock and packege.json, and all the source code (/src) for my react frontend, where you can find all pages and components for my app. Also there is my bundled code directory (/dist), about wich existance in my repo I am going to talk later.

## Running my app

Right now my app is running on pythonanywhere.com. It has no npm installed, so i had to include /dist directory in my source control. Speaking about database, i used MySQL database on pythonanywhere.com

So to run my app you can do the following:

- git clone < name of repository >
- cd AlphaFlow
- pip install -r requirements.txt
- python manage.py collectstatic
- python manage.py runserver

And optionaly:

- cd frontend
- npm install
- npm run build

