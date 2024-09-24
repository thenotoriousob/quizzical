# Quizzical

Quizzical is a React app that allows you to test your general knowledge
- Select the number of questions you would like to answer
- Select the category, difficulty and type of these questions
- View the list of questions based on this criteria
- Select answers you think are correct and then check if you are correct!

# Technologies in use / Tech Stack / Built with

- HTML/CSS/React
- Open Trivia DB API

# Libraries used
React Router/React Spinners/Classnames/He (HTML Entities)

# What I have learned

This was my first proper project with React. Once I decided on the best place to call
the API I found the project enjoyable. Probably the other thing that took a bit of decision
was when choosing between Props/Compound Components. I also tried Context at one stage to
pass data to the Question/Response components, but decided this wasn't the best solution.

I decided to use my own color scheme. I would also have preferred to split the css down into smaller files but importing these didn't seem to work in Scrimba.

I also used Debouncing to prevent the double call of the API in StrictMode.

I added an animation on Hover of the buttons for something a bit different, and that exposed
me to @property and @keyfranes. I made sure that this was still accessible from the keyboard.

I have added in error handling in case anything goes wrong with the API call.
