# SunbirdQumlPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

# Common angular components for Sunbird QUML Player!

Contains common UI components powered by angular. These components are designed to be used in sunbird consumption platforms *(mobile app, web portal, offline desktop app)* to drive reusability, maintainability hence reducing the redundant development effort significantly.

# Getting Started

## Step 1 : Clone the Project and install necessary dependencies of the Project by following steps: 

    npm i 

## Step 2 : Run ng build to build the project.

    ng build quml-library

    The build artifacts will be stored in the dist/sunbird-quml-player.


## Using the Sunbird-QUML-Player in your Project 

For help getting started with a new Angular app, check out the Angular CLI.

For existing apps, follow these steps to begin using .

## Step 1: Install the necessary packages for the Project by using npm i 

    npm i 

    npm link 'PATH_TO_QUMLPLAYER/sunbird-quml-player/dist/quml-library/'
	

  
## Step 2: Include the Sunbird QUML Player styles and scripts in angular.json 

    "styles": [
	    ...
	    ...
         "src/styles.css",
         "./node_modules/katex/dist/katex.min.css"
         "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    ],
     "scripts": [
            ...
            ...
            "./node_modules/katex/dist/katex.min.js"
            ]

## Step 3: Import the modules and components

Import the NgModule for each component you want to use:

    import {QumlLibraryModule} from 'quml-library';
    import { CarouselModule } from 'ngx-bootstrap/carousel';


    @NgModule({
	    ...
	    imports: [ QumlLibraryModule,
   `     CarouselModule.forRoot()],
	    ...
    })

    export class TestAppModule { }

## Available components

| Feature | Notes| Selector|
|--|--|--|
| [MCQComponent]([https://github.com/sharathkashyap
/
sunbird-quml-player](https://github.com/Sunbird-Ed/SunbirdEd-consumption-ngcomponents)) | Can be used in the library page for all consumption platforms| sb-library-card|