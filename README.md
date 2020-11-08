# Petful Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#  https://sliger-petful.vercel.app/ #

This is the frontend of the Petful app, created in React/JS.

The backend is utilizing Node.js and the Express Library

As a user you can:
Add your name to the waitlist in the 
center, and click adopt
below the pet you'd like to adopt.

Random users are automatically queued 
in front of you on page load, and 
behind you when you are in the front.

Adopting a pet will reset the cycle.

This looping is handled in the front
end.
        
The pets are displayed in a FIFO Queue 
data structure, and clicking adopt 
will cycle to the next pet available

Once the queue is empty, the server 
automatically refills the dummy data 
back into the queue, so there are no 
gaps.

GitHub
==== Back-End ====
https://github.com/michaeljsliger/sliger-petful



==== Front End ====
https://github.com/michaeljsliger/sliger-petful-frontend