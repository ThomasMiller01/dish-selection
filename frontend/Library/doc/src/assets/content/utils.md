## Datetime

Easily display the current (or custom) datetime with multiple formats.

#### Parameters

| name   | type               | default    | comment                                       |
| ------ | ------------------ | ---------- | --------------------------------------------- |
| value  | `string` or `date` | new Date() | required                                      |
| format | `string`           | "datetime" | for more information on formats, see #formats |

##### Formats

**datetime** - `dd.mm.yyyy HH:MM:ss` (<Datetime format="datetime"></Datetime>)

**timedate** - `HH:MM:ss dd.mm.yyyy` (<Datetime format="timedate"></Datetime>)

**date** - `dd.mm.yyyy` (<Datetime format="date"></Datetime>)

**time** - `HH:MM:ss` (<Datetime format="time"></Datetime>)

**hour** - `HH` (<Datetime format="hour"></Datetime>), **minute** - `MM` (<Datetime format="minute"></Datetime>), **second** - `ss` (<Datetime format="second"></Datetime>)

**day** - `dd` (<Datetime format="day"></Datetime>), **month** - `mm` (<Datetime format="month"></Datetime>), **year** - `yyyy` (<Datetime format="year"></Datetime>)

#### Examples

```js
import Datetime from "library/src/components/Datetime/datetime";
```

Current time with default format:

<Datetime></Datetime>

```html
<Datetime />
```

Current time with custom format:

<Datetime format="timedate"></Datetime>

```html
<Datetime format="timedate" />
```

Custom value with custom format:

_! Be aware that js `new Date()` does not accept the EU style `dd-mm-yyyy ...` but it only accepts the US style `mm-dd-yyyy ...`, who knows why :/ !_

<Datetime value="07-18-2022 19:14:36" format="datetime"></Datetime>

```html
<Datetime value="07-18-2022 19:14:36" format="datetime" />
```

Custom js value:

<Datetime></Datetime>

```js
<Datetime value={new Date()} />
```

## Highlight Code

Dynamically highlight code snippets.

#### Parameters

| name     | type     | default | comment  |
| -------- | -------- | ------- | -------- |
| language | `string` | "js"    | required |

#### Examples

```js
import Highlight from "library/src/components/Highlight/highlight";
```

JavaScript code snippet:

```html
<Highlight language="js">let tes = 1;</Highlight>
```

<Highlight language="js">let tes = 1;</Highlight>

Html code snippet:

```html
<Highlight language="html">
  <div><b>This is a</b> <i>code</i> snippet ... :O</div>
</Highlight>
```

<Highlight language="html">\<div\>
&emsp;&emsp;\<b\>This is a\</b\> \<i\>code\</i\> snippet ... :O
\</div\>
</Highlight>
