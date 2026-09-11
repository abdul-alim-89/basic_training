Query: Why does using this inside your game object's methods work differently than using it inside a regular standalone function? Try it and write down what you observe.

Ans : My Observations:

When I did not clear the setTimeout, I observed that even though the user answered the next question before the 20-second timer was completed, the previously scheduled setTimeout still executed. As a result, while the user was on Question 2, the game automatically moved to Question 3.
When I did not clear the setInterval, I observed that the timer continued decreasing by 1 second even after moving to the next question. Because the previous interval was still running, the timer continued decreasing and eventually went into negative values.

Conclusion:
Both setTimeout and setInterval should be properly cleared when they are no longer needed to prevent multiple timers from running simultaneously and causing unexpected game behavior.

Query: Why does using this inside your game object's methods work differently than using it inside a regular standalone function? Try it and write down what you observe.

Ans: 

When this is used inside a method called through the game object, it refers to the object that called the method. Therefore, this.score accesses the score property of the games object.

However, in a standalone function, this does not automatically refer to the games object. Its value depends on how the function is called and whether strict mode is enabled.