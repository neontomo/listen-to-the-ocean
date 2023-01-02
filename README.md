# Listen To The Ocean

![ocean](https://user-images.githubusercontent.com/105588693/210265655-8e10625b-1d68-4997-84c0-533b3aad0952.png)

In this game, you play as a guardian of the ocean, collecting trash before it harms the wildlife. With over 60 different species of fish generated by AI, you'll see the beautiful, fragile world of the ocean and how important it is to protect it. Share with your friends and raise awareness of the ocean's fragility.

## Play it

You can play the game [here on my website](https://neontomo.com/play/ocean/).

## About the project

This project started as a collaboration with my class mates that I'm studying with at Hyper Island, for a module that concerned sustainability. We thought about a way to visualise how the ocean is suffering from climate change, overfishing, pollution and microplastics, while making it interactive. This turned out as a browser-friendly game. To play the game, you move your mouse around and try to catch trash that's being dumped into the ocean with your basket. If you fail, and the trash hits a fish, it eats it and dies. The game is intentionally made to me difficult to win; you'll notice some trash whizzing past at impossible speeds. This is not to create despair, but to highlight that collecting trash is not the only action we need to take to save the oceans and the life therein. All the fish, trash and coral images were generated by using public AI tools, which means some of them may exist in real life, and some may be fictional.

## What we learned

We learned that raising awareness is one of the biggest things we can do to change the world, and that visualising and framing problems to make them easier to understand is half of the problem-solving. For me who coded the website, I learned a lot about making the game efficient. Having so many fish on-screen presented problems and buggy code occasionally. One issue that arose was the difficulty in manipulating two separate CSS `transform` values at the same time, as the swimming effect was using it to move the fish across the screen, but also to skew the images to make it look like they were flapping. This caused me to instead use the `left` and `top` values and `position: fixed`, which is less efficient, but important in order to keep the flapping effect. If I redid the project today, I would spend more time trying to implement transform to make the website work better on slow computers. I also learned the value of having fun while trying to solve a problem, as it naturally motivates you.

## Credits

Tomo, Uma, Sunhwi and Maryna

