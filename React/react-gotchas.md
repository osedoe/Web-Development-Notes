# Gotchas in React

## **Event handlers:** Binding `this` and arrow functions

When we define our own methods in React, we are told that we need to bind `this` so we are able reference the actual parent component. Otherwise, `this` will be undefined.
A claner way is using a fat arrow function. Since they are anonymous, they change the way **bind()** behaves inside it.

For example:

```jsx
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
        // 1. We do the following, but it's a problem if we have to declare more than one method
        this.changeContent = this.changecontent.bind(this);
    }

    // 2. So "this" here correctly references App
    changeContent (event) {
        this.setState({
            content: event.target.value
        });
    }

    // 3. But instead, we can turn the method into a fat arrow function, omitting 1)
    changeContent = (event) => {
        this.setState({
            content: event.target.value
        });
    }
}
```