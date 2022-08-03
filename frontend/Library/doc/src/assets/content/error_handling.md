## Alert Messages

Display simple `notification | info | success | warning | error` messages, which can disapper after a delay.

#### Parameters

#### Examples

```js
import AlertMessage from "library/src/components/AlertMessage/alertmessage";
```

Simply display the message (show for this ShowRoom):

```html
<AlertMessage
  visible="true"
  message="This is how a notification message looks like."
/>
<AlertMessage
  visible="true"
  message="This is how an info message looks like."
  level="info"
/>
<AlertMessage
  visible="true"
  message="This is how a success message looks like."
  level="success"
/>
<AlertMessage
  visible="true"
  message="This is how a warning message looks like."
  level="warning"
/>
<AlertMessage
  visible="true"
  message="This is how an error message looks like."
  level="error"
/>
```

<AlertMessage visible="true" message="This is how a notification message looks like."></AlertMessage>
<AlertMessage visible="true" message="This is how an info message looks like." level="info"></AlertMessage>
<AlertMessage visible="true" message="This is how a success message looks like." level="success"></AlertMessage>
<AlertMessage visible="true" message="This is how a warning message looks like." level="warning"></AlertMessage>
<AlertMessage visible="true" message="This is how an error message looks like." level="error"></AlertMessage>

#### Usage

1. Create a referenze that will be used to trigger the alert message

```js
import { createRef } from "react";
...
constructor(props){
  super(props);

  this.alertRef = createRef();
}
```

2. Add the Alert Message as a html tag

```js
<AlertMessage ref={this.alertRef} />
```

3. Call the alert function anytime you want to display a message

```js
componentDidMount() {
  // notify the user that the component is mounted
  this.alertRef.current.alert("This component is now mounted.", "info", 3000);
}
```

#### Functions

| function   | parameters             | comment                                                                 |
| ---------- | ---------------------- | ----------------------------------------------------------------------- |
| alert      | (message, level, time) | time in milliseconds (3000=3s)                                          |
| setMessage | (message)              | sets the message                                                        |
| setLevel   | (level)                | sets the level<br>`notification \| info \| success \| warning \| error` |
| show       | ()                     | shows the alert                                                         |
| hide       | ()                     | hides the alert                                                         |

## Error Page

A ErrorPage that can be customized with a message. Should be displayed when the router navigated to an invalid page.

#### Parameters

| name              | type     | default | comment                                 |
| ----------------- | -------- | ------- | --------------------------------------- |
| file              | `string` | ""      | the filename that the error occurred in |
| error_title       | `string` | ""      | the title of the error                  |
| error_number      | `string` | ""      | the error code                          |
| error_description | `string` | ""      | the error description                   |
| full_size         | `bool`   | false   | true: 100vh <br /> false: 85vh          |

#### Examples

```js
import ErrorPage from "library/src/components/ErrorPage/errorpage";
```

```html
<ErrorPage
  file="App.js"
  error_title="Bad Request"
  error_number="404"
  error_description="The server cannot process the request due to something that is perceived to be a client error."
/>
```

<ErrorPage
    file="App.js"
    error_title="Bad Request"
    error_number="404"
    error_description="The server cannot process the request due to something that is perceived to be a client error."
    >
</ErrorPage>
