# University Research Website

## Overview

The website is developed with the purpose of managing, showing and promoting some of the most notable research from a university

## Demo

Visit Website: https://university-research-website-ui.vercel.app/

## Technoligies

- React.js
- Bootstrap
- React Query & Axios
- Docker & Docker Compose

## Available Scripts

### Development Purpose (with Node.js)

- Download Node.js (https://nodejs.org/en/)
- Go to main folder and run command `npm install`
- After installing the packages, we can run command `npm run start` to bootstrap the app on your localhost

### Development Purpose (with Docker & Docker Compose)

- Download Docker (https://nodejs.org/en/)
- Download Docker Compose (https://docs.docker.com/desktop/install/windows-install/)
- Go to main folder and run `docker-compose -f .\docker-compose.dev.yml build app`
- After the script is completed we can now start the container `docker-compose -f .\docker-compose.dev.yml up app`
- The website will be available on port 3000

### Deployment Purpose (with Docker & Docker Compose)

- Download Docker (https://nodejs.org/en/)
- Download Docker Compose (https://docs.docker.com/desktop/install/windows-install/)
- Go to main folder and run `docker-compose build app`
- After the script is completed we can now start the container `docker-compose up app`
- The website will be hosted by nginx which is available on port 80
