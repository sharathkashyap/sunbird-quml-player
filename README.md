# SunbirdQumlPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

# Common angular components for Sunbird QUML Player!

Contains common UI components powered by angular. These components are designed to be used in sunbird Quml Player *(mobile app, web portal, offline desktop app)* to drive reusability, maintainability hence reducing the redundant development effort significantly.

# Getting Started

## Step 1 : Clone the Project and install necessary dependencies of the Project by following steps: 

    npm install 

## Step 2 : Run ng build to build the project.

    ng build quml-library

    The build artifacts will be stored in the dist/sunbird-quml-player.


## Using the Sunbird-QUML-Player in your Project 

For help getting started with a new Angular app, check out the Angular CLI.

For existing apps, follow these steps to begin using .

## Step 1: Install the following packages

    npm install ngx-bootsrap

    npm install katex
	

  
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
    import {CarouselModule} from 'ngx-bootstrap/carousel';


    @NgModule({
	    ...
	    imports: [ QumlLibraryModule,
        CarouselModule.forRoot()],
	    ...
    })

    export class TestAppModule { }

## Available components

|Feature| Notes| Selector|
|--|--|--|
| [mcqComponent](./projects/quml-library/src/lib/mcq/mcq-component.md) | Can be used in the Quml Player for displaying multiple choice questions| lib-mcq|
| [saComponent](./projects/quml-library/src/lib/sa/sa-component.md)| Can be used in the Quml Player for displaying Short Answer Questions| lib-sa|
| [vsaComponent](./projects/quml-library/src/lib/vsa/vsa.component.md)| Can be used in the Quml Player for displaying Very Short Answer Questions | lib-vsa|
| [laComponent](./projects/quml-library/src/lib/la/la.component.md) | Can be used in the Quml Player for displaying Long Answer Questions| lib-la|
| layoutStripComponent | Can be used in the Quml Player for different kind of Layouts | lib-layoutstrip|