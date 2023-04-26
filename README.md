# Deeplify-Image-Recognition-Model

This a small project with React and FastAPI. Here you can upload an image and then let a trained image recognition model  to identify whether this image is for a cat or a dog. To run the project:
First clone the project in your local system, with regard to frontend you need to go throught fronend folder and run in terminal the following command: 

``` npm install ```
then
``` npm start ``` .

Regarding backend, you need to create a virtual environment by th command:
``` virtualenv envname``` . Activate the virtual env by ``` source envname/bin/activate```
Then, install the required packages in requirements.txt using pip or pip3 as follow:
``` pip install -r requirements.txt ```
or
``` pip3 install -r requirements.txt ```
and then open the app folder and run 
``` uvicorn main:app --reload``` .

Now you can start with the app.
