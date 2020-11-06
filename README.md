# Petful Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#  https://sliger-petful.vercel.app/ #

This is the frontend of the Petful app, created in React/JS.

The backend is utilizing Node.js and the Express Library

As a user you can:
Add your name to the waitlist in the 
center, and click adopt
below the pet you'd like to adopt.
        
The pets are displayed in a FIFO Queue 
data structure, and clicking adopt 
will cycle to the next pet available

Once the queue is empty, the server 
automatically refills the dummy data 
back into the queue, so there are no 
gaps.