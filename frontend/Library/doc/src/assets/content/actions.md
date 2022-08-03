## Button

A simple button, can be a link or a button.

#### Parameters

| name          | type                   | default | comment                                                                                                                    |
| ------------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| action        | `string` or `function` |         | `string`: works as a link<br />`function`: works as a action                                                               |
| level         | `string`               |         | default style: normal color theme, otherwise:<br />sets the level<br>`notification \| info \| success \| warning \| error` |
| invertedStyle | `bool`                 | false   | A button will be styled as a link and a link will be styled as a button.                                                   |

#### Examples

```js
import Button from "library/src/components/Button/button";
```

Link:

```js
<Button action="https://google.com">google.com</Button>
```

<Button action="https://google.com">google.com</Button>

Buttons:

```js
<Button>Normal Button</Button>
```

<Button>Normal Button</Button>

Button with level:

```js
<Button level="error">Error button</Button>
```

<Button level="error">Error button</Button>

Inverted:

```js
<Button action={() => {}} invertedStyle>
  Normal Button
</Button>
```

This looks like a link but it is a button.

<Button invertedStyle="true">Normal Button</Button>

```js
<Button action="https://google.com" invertedStyle>
  google.com
</Button>
```

This looks like a button but it is a link.

<Button action="https://google.com" invertedStyle="true">google.com</Button>
