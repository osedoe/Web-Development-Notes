# React

_Disclaimer:_ These notes are an amalgamation of different notes that I have taken from different tutorials, books and videos. My suggestion is that you bookmark this page and go straight to the point when you are in doubt of a concept / want to refresh it; rather than reading it from top to bottom, since I consider that there's things that should be in a different order. I tried to kept it concise and sorted from simpler to more complex, but it may have incongruences since sometimes I write down terms and explanations hoping to understand it when I put it with my own words rather than because I got fully grasp of it.  

## Table of Content

- [Basics](#Basics)
  - [Components](#Components)
  - [Exporting modules](#Exporting-modules)
  - [Classes](#Classes)
  - [Events](#Events)
  - [State](#State)
  - [Controlled elements](#Controlled-field/input/form-elements)
  - [Props](#Props)
  - [Using _this_](#A-word-of-caution-with-_this_)
  - [Render](#Render)
  - [Nesting components](#Nesting-components-and-accessing-its-data)
  - [Props.children](#Access-Nested-Data-using-`props.children`)
- [Digging deeper](#Digging-deeper)
  - [Events II](#Events-in-React--expanded-)
  - [Reference a component](#Reference-a-component)

---

## Basics

React is a JavaScript library that provides the View layer for the MVC model (Model-View-Controller).

### Components

A React app is made of components. Each component will be an element or group of elements in a website.
For example, a search bar, video, buttons, etc.

React renders (loads to the DOM) many components into a website at the same time with an amazing speed.

Components can be nested and put aside of each others. For example, a list could be a component, with each element of said list being another component.
We should also have a big, final component that wraps the whole applications.

This structure promotes **code reusability**.

_Note:_ A golden rule is that we make a **file per component**, no matter how small.

To create a component, we will do it as:

```JSX
const App = () => {
  return <div> Hi! </div>; // This line is doing a React.createElement() under the hood
};
```

where `<div>Hi!</div>;` is using the JSX syntax to add html to the JavaScript.

---

JSX is a preprocessor step or phase that is inchage of adding XML syntax to JavaScript.
It's similar in to XML in that it has tags, attributes, children, etc.

---

In the case showed above, we are just creating a div element, with a String "Hi!" element on it. Easy.
But if we wanted to add some more, we'll wrap it all in parentheses, in the form:

```JSX
const App = () => {
    return (
        <div>
            <SearchBar/>
            // Where SearchBar is the given variable name of an imported component
        </div>
    );
}
```

We will create a "components" folder, usually inside the "src" folder, with the said files inside.

![Components Structure](/img/components-structure.png)

### Exporting modules

Each of this files must **import** React at the beginning of the document and export the component at the end.

```javascript
// In search_bar.js
import React from "react";

const SearchBar = () => {
    // Code
}

export default SearchBar;
```

We should import the components into the main file, or index.js in this case, obviously.

```javascript
// In index.js
import React from "react";
import ReactDOM from "react-dom";

import SearchBar from "./components/search_bar";
// ...
```

### Classes

There's two types of components in React:

- Functional components
- Class components

---

**Functional component:**  
It's just a function that returns something. It lacks "state".

```JSX
// Functional Component
const Div = () => {
    return <div>Not-complicated</div>
};
```

---

**Class component:**  
It's a component that has an internal record keeping or "state". Some ability of being aware of himself and what happens to him after it renders.

Classes in JavaScript are objects.

When we define a class component, we still have to give it the ability to render itself / return some JSX.

Every class component in React must have a render method.

```JSX
import React from "React";

class SearchBar extends React.Component {
    render() {
        return <input />; // It must return some JSX like the functional component.
    }
}
```

Using the ES6 object destructuring, the previus code can turn into:

```JSX
import React, { Component } from "react";

class SearchBar extends Component {
    // Some Code
}
```

In general, we should try to start with functional components, and only when we need it, we should switch to class components.

### Events

Handling events in React takes two steps:

- We declare an event handler. This will be a function that run when the event occurs.
- We pass the event handler to the element that we want to monitor for events.

First, we will have to declare a function in the class component. Usually, the method name will be: _onInputChange()_ or _handleInputChange()_.

```JSX
class SearchBar extends Component {
    // Mandatory render function inside a class     component
    render() {
        // onChange is a React defined property. It's watching the Change event on the input tag.
        return <input onChange = { this.onInputChange } />;
    }
    // Event handler
    onInputChange(event) {
        console.log(event.target.value);
    }
}
```

### State

State is simply put as values that are supossed to be managed and updated by our components.

State is a plain JS object that is used to record in React to user events. Each class component has its own state object. Whenever the componenent state is changed, the component re-renders and its children.

Before using the state of a component, we need to initialize it. It's done setting the property state inside a constructor method.

_Note:_ By setting up the constructor and the super method inside, we are giving the keyword `this` the context withing our component rather that parent component "React.Component".

```JSX
// ...
class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };
    }
    // ...
}
```

The `super()` method, as usual, calls the parent constructor.

Whenever we use state, we initialize it by creating a new object and assign it to `this.state`. The object we pass will contain properties that we want to record on the state.

_In the previous case, the **term** meaning the "search term" in a search bar But we can use what we want._

Only inside the constructor function we will change the state like `this.state = {[prop]: '' }`. Everywhere else, we will use `this.setState()`, passing an object that contains the new state that we want the component to have.

```JSX
// ...
render() {
    return <input onChange = {event => this.setState({ term: event.target.value})} />;
}
```

From the text above we can summarize a few things:

- We use `this.state` to set the state of a component, doing so in in the constructor. The official documentation says that we should treat `this.state` as if it were immutable. Also, calling `this.state` later on the code after mutating it with `this.setState()` will return the existing value.

- `this.setState()` is used to mutate `this.state`, but not inmediately. It will _"put it on a queue"_ and trigger a re-render when is due, unless `shouldComponentUpdate()` is implemented.

### Controlled field/input/form elements

It's a form element (like `<input/>`) whose value is set by the state, rather than the opposite.

Usually is the state the one that tells the input what the current value should be.

```JSX
// ...
render() {
    return (
        <div>
        <input
        value = { this.state.term }
        onChange = { event => this.setState({ term: event.target.value }) } />
        </div>
    );
}
```

The code that turns this form element into a controlled component is `value = { this.state.term }`.

---

Passing data from the parent component **App** to a child component, we will define a JSX attribute and make a reference to the JS variable.

```JSX
<VideoList videos={this.state.videos} />
```

Passing data like this, is called passing _props_ (or properties).

### Props

Props are a collection of values that are mean to be passed into our components as static values, in opposite of "**state**".

If we have a React component called App with a certain attribute that we create, we can access that attribute from the code of the component with `this.props.[attr]`

```JSX
// In index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App numb={5} />, document.getElementById('root');
);
```

```JSX
// In App.js
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <h1>{this.props.numb}</h1>
        );
    }
}

export default App;
```

**TL;DR:** this.props references the attributes of components.

_Note:_ We can define default properties through `App.defaultProps`

```JSX
App.defaultProps = {
    numb: 5
}
```

There is a way to declare and narrow the types of properties, that has changed since v15.5. [ _fill_ ]

```JSX
// Old way was:
App.propTypes = {
    numb: React.propTypes.number
}
```

The new version uses the prop-types library:
[prop-types](https://www.npmjs.com/package/prop-types)

---

### A word of caution with _this_

An easy problem we may face with `this` in React, it's that it will have a different binding depending on the method we put it in.

Inside _render()_, `this` references the component. React is binding it for us under the hood.

But if we use `this` inside a custom method that we have created, we will get _null_.

So everytime we define our own methods, we have to manually bind this to the component. We will do it as follows:

```JSX
class MyReactComponent extends React.Component {
    constructor(props) {
        super(props);
        // Custom method bindings have to call super(props) first, and then writing each one needed down
        this.someFunction = this.someFunction.bind(this);
    }
}
```

There's another way to bind this that we will see later on. When we are more familiarized with the concepts.

### Render

The render method is the heart of our components. It's function it's to return
a single node, or better said, everything have to be wrapped in a parent tag (usually _div_), or just being one rendered.

```JSX
    // ...
    render() {
        return (
            <div>
                <!-- children elements -->
            </div>
        );
    }
```

when writing the return is good practice doint it so as showed, or if it's short, putting it on one line.

It's necessary to know that the JSX syntax inside the return is calling `React.createElement()` under the hood.

### Nesting Components and accessing its data

A React component can render other React components.

```JSX
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: "this is a state text"
        }
    }
    update(e) {
        this.setState({txt: e.target.value})
    }
    render() {
        return (
            <div>
                <h1>{this,state.txt}</h1>
                <Widget update={this.update.bind(this)} />
            </div>
        );
    }
}

const Widget = props => <input type="text" onChange={props.update} />
```

We see that our child component is updating the state of our parent component (the Widget-input is updating the App-h1).

Note the use of `props.update` instead of `this.update.bind(this)` in the children component since props makes reference to the parent component, using its `update()` method.

### Access Nested Data using `props.children`

```JSX
class App extends React.Component {
    render() {
        return (
            <Button>React</Button>
        );
    }
}

const Button = props => <button>The content is {props.children}</button>


```

Here, we are creating a component Button (not get confused with the tag button), and since the data inside is "React", we can access it using the given `props.children`.

Another example is:

```JSX
class App extends React.Component {
    render() {
        return <Button>I <Heart /> React</Button>
    }
}

const Button = props => <button>The content is {props.children}</button>

class Heart extends React.Component {
    render() {
        return <span>&hearts;</span>
    }
}
```

![ReactButton](/img/ReactBtn.png)

---
---

## Digging deeper

### Events in React -expanded-

React has a Event System that normalize them across different browsers.

We will declare attributes to define them and binding it to the action we want. Some examples are:

```JSX
class App extends React.Component {
    constructor() {
        super();
        this.state = {currentEvent: "---"}
        this.update = this.update.bind(this);
    }
    update(e) {
        this.setState({currentEvent: e.type})
    }
    render() {
        return (
            <div>
                <textarea
                    onKeyPress={this.update}
                    onCopy={this.update}
                    onCut={this.update}
                    onPaste={this.update}
                    onFocus={this.update}
                    onBlur={this.update}
                    onMouseOver={this.update}
                    onMouseDown={this.update}
                    onMouseUp={this.update}
                    onDoubleClick={this.update}
                    onTouchStart={this.update}
                    onTouchMove={this.update}
                    onTouchEnd={this.update}
                    cols="30"
                    rows="10"
                />
                <h1>{this.state.currentEvent}</h1>
            </div>
        );
    }
}
```

### Reference a Component

We will reference specific components through the `ref` keyword.

The problem we find is that we more than one event tries to update an event. It won't work individually.

The code below will update both states, so it won't work as we expect:

```JSX
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            a: ""
        }
    }
    update(e) {
        this.setState({
            a: e.target.value,
            b: e.target.value
        })
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={this.update.bind(this)}
                /> {this.state.a}
                <hr />
                <input
                    type="text"
                    onChange={this.update.bind(this)}
                /> {this.state.b}
            </div>
        );
    }
}
```

![Ref1](/img/Ref1.png)

We wil give each element an attribute `ref="[name]"` and inside the _setState_, using `refs` returns the node we are referencing.

```JSX
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            a: ""
        }
    }
    update(e) {
        this.setState({
            a: this.refs.a.value,
            b: this.refs.b.value
        })
    }
    render() {
        return (
            <div>
                <input
                    ref="a"
                    type="text"
                    onChange={this.update.bind(this)}
                /> {this.state.a}
                <hr />
                <input
                    ref="b"
                    type="text"
                    onChange={this.update.bind(this)}
                /> {this.state.b}
            </div>
        );
    }
}
```

The `ref` attribute or prop can also take a callback and return the node or component that we reference with:

```JSX
// ...
update() {
    this.setState({
        /* These two are equivalent */
        a: this.a.value,
        b: this.refs.b.value
    })
}
render() {
    return (
        <div>
            <input
            /* The line below has changed */
                ref={ node => this.a = node }
                type="text"
                onChange={this.update.bind(this)}
            /> {this.state.a}
            <hr />
            <input
            /* But it's still equvialent to this one */
                ref="b"
                type="text"
                onChange={this.update.bind(this)}
            /> {this.state.b}
            </div>
    );
}
```

We can also reference an instance of another component.

```JSX
// ...
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            a: ""
        }
    }
    update(e) {
        this.setState({
            /* a is not longer a node, it's a component */
            // a: this.a.value,
            /* If we bring ReactDOM, we can fix all of this like */
            a: ReactDOM.findDOMNode(this.a).value
            b: this.refs.b.value
        })
    }
    render() {
        return (
            <div>
                <Input
                /* Since we are referencing a component, we should change this line to */
                    ref={ component => this.a = component }
                    onChange={this.update.bind(this)}
                /> {this.state.a}
                <hr />
                <input
                    ref="b"
                    type="text"
                    onChange={this.update.bind(this)}
                /> {this.state.b}
            </div>
        );
    }
}

class Input extends React.Component {
    render() {
        return <input type="text" onChange={this.props.update} />
    }
}
```

Remember to always reference the actual Node we want, not a parent/child, if we are using this `ReacDOM.findDOMNode()` method.

### Lifecycle of Components

_Mounting:_ Component is added to the DOM.  
_Unmounting:_ Component is removed from the DOM.

There also exists a bunch of methods that would let us access to different stages of the state. of these Components.

1. **componentWillMount():** This lifecycle phase is going to fire off before it's mounted into the DOM, and let us know that is guaranteed to make it into the DOM. It will only fire once.
2. **ComponentDidMount():** This phase is going to fire off right after the Component has been mounted into the DOM.  Again, it will only happen once.
3. **ComponentWillUnmount():** This is going to fire when the Component is about to leave the DOM.

```JSX
class App extends React.Component {
    constructor() {
        super();
        this.state = {val: 0}
        this.update = this.update.bind(this);
    }
    update() {
        this.setState({val: this.state.val + 1 })
    }
    componentWillMount() {
        console.log("componentWillMount");
    }
    render() {
        console.log("render");
        return <button onClick={this.update}>{this.state.val}</button>
    }
    componentDidMount() {
        console.log("componentDidMount");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
}

class Wrapper extends React.Component {
    mount() {
        ReactDOM.render(<App />, document.getElementById('a'));
    }
    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'));
    }
    render() {
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>UnMount</button>
                <div id="a"></div>
            </div>
        );
    }
}

// ==========

export default Wrapper;
```

---

### Managing the state in Lifecycle methods

When we talk about the methods seen in the previous chapter, we need to clear up how to access to the state and promp in each of them.

**componentWillMount():**  
Here, we have access to our state and prompts but not to the DOM representation of the component, since it hasn't been rendered yet. What it's important here is that we are able to set and modify the state of a component before it renders.

**componentDidMount():**  
We have access to the component in the DOM _(we can prove that with React.findDOMNode(this) inside the method)_5.

**componentWillUnmount():**  
We have the opportunity to clean up any running processes that we might need to. Usually this will come handy if some code tries to set the state of a component after it has been ummounted.

### Updating Lifecycle methods in our components

1. **componentWillReceiveProps(nextProps):** It's used to receive new properties, through the parameter nextProps.
2. **shouldComponentUpdate(nextProps, nextState):** It's going to take in our next props, as well as out next state as arguments. It's important to note that when it says update it means re-render. The actual state of a component can be changed without the component being re-rendered.
3. **componentDidUpdate(prevProps, prevState):** Used to retrieve the props and state before it's rendered.