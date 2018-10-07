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
  - [Keys](#Keys)
- [Digging deeper](#Digging-deeper)
  - [Events II](#Events-in-React--expanded-)
  - [Reference a component](#Reference-a-component)
- [Lifecycle of components](Lifecycle-of-components)
  - [Managing the state in lifecycle methods](#Managing-the-state-in-lifecycle-methods)
  - [Updating lifecycle methods](#Updating-lifecycle-methods-in-our-components)
- [Pattern for passing data - First pattern](#First-programming-pattern)
  - [From Parent to Child component](#Stateless-components-inherits-from-stateful-components)
  - [From Child to Parent component](#Child-component-updates-Parent-state)
  - [Updating props from Child to Sibling](#Child-component-updates-Siblings'-props)
- [Pattern that divides components between presentational and container ones](#Second-programming-pattern)
- [Style in React](#Style-in-React)

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
};

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

### Props and PropTypes

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

### PROP-TYPES

Functional components are stateless, but they usually have `props` passed to them.  
These props are passed as a parameter to the functional components, and will be equal to the component's `props` object. It's also good practice to call the parameter "props".

```JSX
// Normal way to display a prop:
export class MyComponentClass extends React.Component {
    render() {
        return <h1>{this.props.title}</h1>;
    }
}

// Stateless functional component way to display a prop:
export const MyComponentClass = (props) => {
    return <h1>{props.title}</h1>;
}

// Normal way to display a prop using a variable:
export class MyComponentClass extends React.component {
    render() {
        let title = this.props.title;
        return <h1>{title}</h1>;
    }
}

// Stateless functional component way to display a prop using a variable:
export const MyComponentClass = (props) => {
    let title = props.title;
    return <h1>{title}</h1>;
}
```

And the PropTypes are defined after the component declaration as:

```JSX
const Example = (props) => {
    return <h1>{props.message}</h1>;
}

Example.propTypes = {
    message: React.PropTypes.string.isRequired
};
```

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

### Keys

There's going to be cases when we build lists in JSX that we will need keys.
They are JSX attributes with an unique value with the form `key=02`.

The library itself will use them to track the list, so we won't use them directly.

As a general rule, a list needs keys when:

- The list items have memory from one render to the next. Like when a to-do list renders, each item must remember whether it was checked off.
- A list's order might be shuffled. For instantce, in a search result, it might be shuffled from one render to another.

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

---

## Lifecycle of Components

_Mounting:_ Component is added to the DOM.  
_Unmounting:_ Component is removed from the DOM.

There also exists a bunch of methods that would let us access to different stages of the state. of these Components.

1. **componentWillMount():** This lifecycle phase is going to fire off before it's mounted into the DOM, and let us know that is guaranteed to make it into the DOM. It will only fire once.
2. **ComponentDidMount():** This phase is going to fire off right after the Component has been mounted into the DOM. Again, it will only happen once.
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
We have access to the component in the DOM \_(we can prove that with React.findDOMNode(this) inside the method)\_5.

**componentWillUnmount():**  
We have the opportunity to clean up any running processes that we might need to. Usually this will come handy if some code tries to set the state of a component after it has been ummounted.

### Updating Lifecycle methods in our components

1. **componentWillReceiveProps(nextProps):** It's used to receive new properties, through the parameter nextProps.
2. **shouldComponentUpdate(nextProps, nextState):** It's going to take in our next props, as well as out next state as arguments. It's important to note that when it says update it means re-render. The actual state of a component can be changed without the component being re-rendered.
3. **componentDidUpdate(prevProps, prevState):** Used to retrieve the props and state before it's rendered.

---
---

## First programming pattern

### Stateless components inherits from stateful components

This pattern happens passing down the `state` from a Parent component to a Child one.

So, first we need to build the parent component, which has to get a constructor function to be able to set the initial state.

```JSX
// Parent.js
import React from 'react';
import ReactDOM from 'react-dom';

import { Child } from './Child.js';

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Rudolf'
        }
    }
    render() {
        return (
            <Child name={this.state.name} />
        );
    }
}
// ====== //
ReactDOM.render(
    <Parent />,
    document.getElementById('app')
);
```

As for the Child component, we don't need to import ReactDOM since is going to be rendered inside the Parent component.

Since it's a stateless component, it will receive a props "name", from the Parent state, that we can display through `this.props.[prop-name]`. This is how a Child component can inherit the prop and display it.

We need to remember to **export** the Child component since it's rendered inside another component.

```JSX
// Child.js
import React from 'react';

class Child extends React.Component {
    render() {
        return (
            <h1>Hey, my name is {this.props.name}</h1>
        );
    }
}

export default Child;
```

---

-=[ REMINDER ]=-

A component should never update its own props.

**We use `state` to update information inside a component, while we use `props` to store informatio that can be changed by a different component.**

---

### Child component updates Parent state

The first pattern is based in passing a prop from a stateful Parent component to a stateless Child component. The second one expands on the first one, and as we will see the Parent passes down an _event handler_ to the Child. Then the Child uses that _event handler_ to update the Parent's `state`.

The steps to do this are:

1. The Parent component defines a method that will include `this.setState()`.
2. It will also bind this method to the instance of the component in the constructor with `this.someFunction = this.someFunction.bind(this)`. This last action ensures that when we pass the method to the Child component, it will still update the Parent one.
3. Now, we render the Child Component and pass down the method as a prop.
4. Lastly, the Child component will receive the function and use it as a event-handler. This event will update the parent's state.

```JSX
// ParentClass.js
import React from 'react';
import ReactDOM from 'react-dom';

import { ChildClass } from './ChildClass.js';

class ParentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalClicks: 0,
        }
        // Step 2
        this.handleClick = this.handleClick.bind(this);
    }

    // Step 1
    handleClick() {
        const total = this.state.totalClicks;
        this.setState({
                totalClicks: total + 1,
            });
    }
    render() {
        return (
            // Step 3
            <ChildClass onClick={this.handleClick} />,
            document.getElementById('app')
        );
    }
}
```

```JSX
// ChildClass.js
import React from 'react';

class ChildClass extends React.Component {
    render() {
        return(
            // Step 4 - Notice that is "onClick" instead of "handleClick" here
            <button onClick={this.props.onClick}>
                Click me!
            </button>
        );
    }
}
```

### Child component updates Siblings' props

One more time, we will expand the pattern. Now the Child component will update the Parent's `state`, and the Parent will pass this `state` to a Sibling component.

The sum of all these patterns will allow us to interact with components.

Usually, as a golden rule, **each component should just have one job.** So, under this new directive we are going to have one stateless component that will display information and a different stateless component that can change said info.

```JSX
// Parent.js
import React from 'react';
import ReactDOM from 'react-dom';

import { Child } from './Child';
import { Sibling } from '/Sibling';

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Frankfurt'
        }
        this.changeName = this.changeName.bind(this);
    }
    // Step 1
    changeName(newName) {
        this.setState({
            name: newName
        });
    }
    render() {
        // Step 2 (Child) and step 5 (Sibling)
        // Before, <Child/> had both attributes:
            // name={this.state.name} and onChange.
        // But now, we will put that attribute into <Sibling/>
        return (
            <div>
                <Child onChange={this.changeName} />
                <Sibling name={this.state.name} />
            </div>
        );
    }
}
```

```JSX
// Child.js
import React from 'react';

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    // Step 3
    handleChange(e) {
        const name = e.target.value;
        this.props.onChange(name);
    }
    render() {
        // Step 4
        // The event handler will be "onChange={this.handleChange}"
        return (
            <div>
                <select id="great-names"
                        onChange={this.handleChange}>
                    <option value="Frarthur">Frarthur</option>
                    <option value="Gromulus">Gromulus</option>
                    <option value="Thinkpiece">Thinkpiece</option>
                </select>
            </div>
        );
    }
}

export default Child;
```

```JSX
// Sibling.js
import React from 'react';

class Sibling extends React.Component {
    // Step 6
    render() {
        const name = this.props.name;
        return (
            <div>
                <h1>Hey, my name is {name}</h1>
                <h2>Don't you think {name} is the prettiest name ever?</h2>
                <h2>Sure am glad that my parents picked {name}!</h2>
            </div>
        );
    }
}

export default Sibling;
```

If we look through the code, we see that the Sibling component is the one in charge of displaying the info, while Child will change it.

We can sum up the process as:

1. A stateful parent component defines a function that calls `this.setState`.
2. We pass down the method to a stateless component inside the render method in the parent through an attribute.
3. The chosen stateless component defines another function that calls the previous one and takes an _event object_ as an argument.
4. The stateless comoponent uses this new function as an _event handler_. Therefore, when the event is detected, the parent's state updates.
5. Back into the stateful parent component, a different child component -Sibling- will be the one in charge of displaying the content.
6. The stateless component receives the parent's state and displays it with the aid of `this.props.name` and `{name}`.

---

-=[ REMINDER ]=-
_The idea we need to grasp here is how one child component changes the state while the other one displays it._

---

There's another pattern we need to know with React: **Dividing components into presentational components and container components**.

## Second programming pattern

### Dividing components into presentational components and container/display components

The pattern we are introducing now is useful when we have a component that does _"too much stuff"_. It will help us identifying them and how to divide them into smaller chunks.

The idea behind it is:  

- **If a component has to have a `state`, make calculations based on `props`, or manage any other logic, then that component should NOT render JSX. Instead, it should render another component which will be the one rendering said JSX.**

In the end, this pattern separates the business logic from the the presentational logic.

The **presentational component** does NOT need:

- `import ReactDOM from 'react-dom'`
- `ReactDOM.render()`

And we will need to _export_ said class component.  
We do these things because the presentational component will get rendered by the container component.

The **container component** will render itself in ReactDOM, and in the render-return should render the presentational component, without the HTML-like JSX, and with a prop.

Lastly, coming back to presentational component, it will have to just have a render function that will render the JSX, and pass a `this.props.[name]`.

"_In this programming pattern, the container component does the work of figuring out what to display. The presentational component does the work of actually displaying it. If a component does a significant amount of work in both areas, then that's a sign that you should use this pattern!_"

- [Read More about container components](https://medium.com/@learnreact/container-components-c0e67432e005)  
- [Talk about the same topic](https://www.youtube.com/watch?v=KYzlpRvWZ6c&t=1351)

Let's see an exampe of a component that fetchs data and renders it.

```JSX
class CommentList extends React.Component {
    this.state = {
        comments: []
    }
    componentDidmount() {
        fetchSomeComments(comments => this.setState({ comments: comments }));
    }
    render() {
        return (
            <ul>
                {this.state.comments.map(c=> (
                    <li>{c.body}-{c.autor}</li>
                ))}
            </ul>
        );
    }
}
```

Following what we have seen, we will divide it in two componentes: `ComponentName` and `ComponentNameContainer`.

```JSX
class CommentListContainer extends React.Component {
    state = { comments: [] };
    componentDidMount() {
        fetchSomeComments(comments => this.setState({ comments: comments }));
    }
    render() {
        return <CommentList comments={this.state.comments} />;
    }
}
```

```JSX
const CommentList = props =>
    <ul>
        {props.comments.map(c=> (
            <li>{c.body}-{c.autor}</li>
        ))}
    </ul>
```

---

## Style in React

Now, we will review a bit more in depth some material we have introduced at the beginning of the notes and some new stuff.

**Inline Styles:**  
Styles that are written as atributes of html tags, as follows:

```JSX
<h1 style={{ background: 'blue', color: 'red' }}> Hello World </h1>
```

- The outter curly braces inject JavaScript into JSX.
- The inner curly braces create a JS object literal.

**Style Object Variables:**  
An alternative to the inline styles is storing all the styles in an object variable and injecting it to the JSX.

```JSX
import React from 'react';

const styles = {
    color: 'blue';
    background: 'red'
}

 export class Example extends React.Component {
    render() {
        return (
            <h1 style={styles}>
                Example text
            </h1>
        );
    }
}
```

Usually, defining a variable named "styles" at the top level of a file is bad practice, but not here.

Note, however, that we are not using export default, since at the moment of writing this, I'm pretty sure that export-default compiles to module.exports throught Babe. And using module.exports we are declaring global variables (it's quite dumb naming a global variable _styles_, we would be all up to conflicts).

**Naming Syntax in React:**  
In plain JS, we use this syntax

```javascript
const styles = {
    "margin-top": "20px",
    "background-color": "red"
};
```

In React, we use camelCase for the styles names and the values when they don't appear in strings, it's assumed that they are in "pixels", hence it can be omitted .

```JSX
const styles = {
    marginTop: '20px',
    backgroundColor: 'red',
    fontSize: 30 // same as '30px'
};
```

---

**Importing styles:**
Usually, we will write the styles for React in a \*.js file and import it to the different components, as follows:

```JSX
// styles.js
const blue = 'rgb(139, 157, 195)';
const darkBlue = 'rgb(059, 089, 152)';
const lightBlue = 'rgb(223, 227, 238)';
const grey = 'rgb(247, 247, 247)';
const white = 'rgb(255, 255, 255)';

const colorStyles = {
  blue: blue,
  darkBlue: darkBlue,
  lightBlue: lightBlue,
  grey: grey,
  white: white
};

export colorStyles;
```

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import { colorStyles } from './styles';

let divStyle = {
  backgroundColor: styles.darkBlue,
  color: styles.white
};

export class Wow extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        Wow, I stole these colors from Facebook!
      </div>
    );
  }
}

ReactDOM.render(
    <Wow />,
    document.getElementById('app')
);
```

We see that usually we tend to define the styles between the **import**'s and the component declarations, referencing the stylesheet file.

```JSX
// imports...

const h1Style = {
    color: styles.color,
    fontSize: styles.fontSize,
    fontFamily: styles.fontFamily,
    padding: styles.padding,
    margin: 0
};

// components...
```
