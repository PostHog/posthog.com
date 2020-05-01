---
title: Using the handbook
sidebar: Company
showTitle: true
---

## First time set up

### 1- Pre-requisites

You need to install NPM and Node. The easiest way to do this is to start by installing brew:

* Open your terminal
* Run ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"```
* Run ``` brew install node```
* Run ```npm i docsify-cli -g```

### 2 - First time set up
!> The content that renders the website is inside the ```/docs``` folder.

* Go into your terminal, run ```git init```
* Now, run ```git clone https://github.com/posthog/handbook.git```
* Run ```cd handbook``` to navigate into the correct folder

### 3 - Making a change
* Run ```git pull``` to make sure your local version is up to date
* Create a new branch ```git checkout -b examplename```
* Run ```docsify serve docs``` (do **not** run ```docsify init``` as that'll overwrite the config)
* Edit any of the markdown as you need to, and save your changes.
* Check the changes look ok locally by visiting ```http://localhost:3000```
* Press Control + C to quit the running process
* Go, and run ```git status```, this will show you the files that need to change
* Run ```git add .```, this will add your changes to the commit
* Run ```git commit -m "a short description of your change"```
* Push your changes with ```git push origin examplename```
* Go to github.com, visit the repo and create a pull request to merge your branch with main
