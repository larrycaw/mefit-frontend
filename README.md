# MeFit

MeFit is an application built for managing workout goals. Regular users of the application can view programs, workouts and exercises, as well as update their user profiles. They can then set a goal for themselves based on a program, and optionally add extra workouts to their goal. Contributors (and admins) will also have the option to create and edit exisiting workouts, programs and exercises.

This repository contains the frontend of the application, which is created in React using Keycloak for user authentication. Backend can be found [here](https://gitlab.com/g5453/backend).

## Deployed using Heroku with continous deployment

[MeFit Heroku App](https://me-fit-noroff.herokuapp.com/)

## Install

**For this project you will also need to install the [backend](https://gitlab.com/g5453/backend) and have a running [Keycloak](https://hub.docker.com/r/jboss/keycloak/) instance running on your computer.**

Then you can install the frontend locally:
```bash
git clone https://gitlab.com/g5453/frontend.git
npm install
```

You will also have to update the following variables:

In [src/API.js](https://gitlab.com/g5453/frontend/-/blob/main/src/API.js#L1), you should update the link with the port your local instance of the backend is running on.

In [src/Keycloak.js](https://gitlab.com/g5453/frontend/-/blob/main/src/Keycloak.js#L2), you should update the url, realm and clientId to the correct variables for your local running Keycloak instance.

## Usage

First make sure the backend and Keycloak is running. Then, in the project directory, run:

```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Maintainers

Stian Økland [@StianOkland](https://gitlab.com/StianOkland)<br />
Isak Hauknes [@larrycaw](https://gitlab.com/larrycaw)<br />
Andrea Hårseth Nakstad [@andreahn](https://gitlab.com/anakstad)
