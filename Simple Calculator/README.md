# 🧮 Simple Calculator

A clean and responsive calculator built using **HTML, CSS, JavaScript, and Tailwind CSS**.

This project is part of my JavaScript learning journey, where I'm revisiting core concepts by building practical projects instead of only reading theory.

## 🚀 Live Demo

https://simple-calculator-nine-olive.vercel.app/

## 📂 Source Code

https://github.com/itsaivivek/js-project/tree/main/Simple%20Calculator

## ✨ Features

* Perform basic arithmetic operations
* Supports multi-digit and decimal numbers
* Correct operator precedence
* Light, Dark, and System theme
* Responsive design
* Button click animation
* Custom digital display font
* Works without using `eval()`

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Tailwind CSS

## 📚 What I Learned

While building this project, I practiced:

* DOM Manipulation
* Event Delegation
* Local Storage
* Theme Switching
* Stack-based expression evaluation
* Infix to Postfix conversion
* JavaScript functions
* Regular Expressions (Regex)
* Writing reusable and organized code

## ⚙️ How It Works

### Display

Every button click updates the calculator display dynamically using JavaScript.

### Event Delegation

Instead of attaching events to every button, a single event listener handles all button clicks, making the code cleaner and easier to maintain.

### Expression Evaluation

Instead of using JavaScript's `eval()` function, the calculator follows these steps:

1. Converts the infix expression into postfix notation.
2. Uses operator precedence to maintain the correct calculation order.
3. Evaluates the postfix expression using a stack.
4. Displays the final result.

This approach helped me understand how calculators work internally.

### Theme Support

Users can switch between:

* ☀️ Light
* 🌙 Dark
* 💻 System

The selected theme is saved in Local Storage.

## 📁 Project Structure

```text
Simple Calculator/
│
├── index.html
├── style.css
├── script.js
├── fonts/
└── README.md
```

## 🎯 Purpose

This project is another addition to my **js-project** repository, where I'm building JavaScript projects from beginner to advanced.

The goal is to improve my understanding of JavaScript by applying concepts through real projects and tracking my progress over time.

## 🙌 Feedback

If you have any suggestions or ideas for improvement, feel free to open an issue or submit a pull request.

If you liked this project, consider giving it a ⭐.
