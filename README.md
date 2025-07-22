# React and p5.js

Vite and React App with p5.js for generating n by n simple block sprites based on an algorithm.

# <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Processing_2021_logo.svg" height=20 /> Processing Java

The initial sketch was written in Processing Java, <a href="https://github.com/Mystery-Coder/Sprite-Generator"></a>. To run on the web, that sketch was written in p5.js, an almost equivalent library.
The p5

# 🧠 Algorithm

The algorithm is quite simple, dividing the canvas into n by squares and then colouring the left half randomly, mirror it on the right side. Also, colour the middle column randomly if n is odd.
This simple algorithm allows generation of an exponential number of images. More explaination given in the original sketch.

# 🌐 Usage

Try it out at [Sprite Generator](https://sprite-react-p5.vercel.app/)
or to use locally, `clone` this repo and run

```bash
$ cd sprite-react-p5
$ npm install
$ npm run dev
```
