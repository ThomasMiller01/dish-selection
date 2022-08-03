## Page Container

A Page Container is a container that lays over the whole page. It can adjust to the whole page or to a part with a header and footer. It also has a automatic background color for the color themes.

The Page Container holds the page content.

#### Parameters

| name      | type     | default | comment                        |
| --------- | -------- | ------- | ------------------------------ |
| className | `string` | ""      |                                |
| fullsize  | `bool`   | false   | true: 100vh <br /> false: 85vh |
| padding   | `bool`   | true    |                                |

#### Examples

```js
import PageContainer from "library/src/components/PageContainer/pagecontainer";
```

Simple:

```html
<PageContainer>
  <h1>Title</h1>
  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
</PageContainer>
```

With parameters:

```html
<PageContainer className="custom-class" fullsize="true" padding="false">
  <h1>Title</h1>
  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
</PageContainer>
```

## Cards

A simple card that can be easily stacked with other cards. It supports html elements in its header, body and footer.

A preconfigured card with simple strings can be used for ease of use (see Examples).

#### Parameters (Preconfigured Cards)

| name   | type     | default | comment |
| ------ | -------- | ------- | ------- |
| title  | `string` | ""      |         |
| footer | `string` | ""      |         |

#### Examples

Preconfigured card with strings:

```js
import Card from "library/src/components/Card/card";
```

```html
<Card title="Card Title" footer="Card Footer">
  <p>This is a card body.</p>
</Card>
```

<Card title="Card Title" footer="Card Footer">
  <p>This is a card body.</p>
</Card>

Using card frames:

```js
import CardFrame from "library/src/components/Card/card_frame";
import CardHeader from "library/src/components/Card/card_header";
import CardBody from "library/src/components/Card/card_body";
import CardFooter from "library/src/components/Card/card_footer";
```

```html
<CardFrame>
  <CardHeader>
    <h5>Title</h5>
  </CardHeader>
  <CardBody>
    <p>This is a card body with <b>html</b> <i>elements</i>.</p>
  </CardBody>
  <CardFooter>
    <small>And small footer text :o</small>
  </CardFooter>
</CardFrame>
```

<CardFrame>
  <CardHeader>
    <h5>Title</h5>
  </CardHeader>
  <CardBody>
    <p>This is a card body with <b>html</b> <i>elements</i>.</p>
  </CardBody>
  <CardFooter>
    <small>And small footer text :o</small>
  </CardFooter>
</CardFrame>

You can even put the header at the bottom:

```html
<CardFrame>
  <CardBody>
    <p>This is a card body with <b>html</b> <i>elements</i>.</p>
  </CardBody>
  <CardHeader>
    <h5>Title</h5>
  </CardHeader>
</CardFrame>
```

<CardFrame>    
  <CardBody>
    <p>This is a card body with <b>html</b> <i>elements</i>.</p>
  </CardBody>    
  <CardHeader>
    <h5>Title</h5>
  </CardHeader>
</CardFrame>

## Modals

Modals can be used to interact with the user. They can display information and give the user control over how to proceed with buttons. In the body html elements can be used. Currently only one button appart from "Close" can be set with a custom action.

A Modal has two items, the Modal itself and a Button to summon the modal.

#### Parameters (Button)

| name      | type     | default | comment                            |
| --------- | -------- | ------- | ---------------------------------- |
| id        | `string` | ""      | required! - links button and modal |
| className | `string` | ""      |                                    |
| style     | `object` | {}      | style will be used on the button   |
| invisible | `bool`   | false   | remove background and border       |

#### Parameters (Modal)

| name        | type       | default  | comment                                              |
| ----------- | ---------- | -------- | ---------------------------------------------------- |
| id          | `string`   | ""       | required! - links button and modal                   |
| title       | `string`   | ""       | the modal title                                      |
| button      | `string`   | ""       | the text of the button                               |
| action      | `function` | () => {} | js function that is triggered by clicking on button  |
| show_dialog | `string`   | ""       | show the modal without the button (ShowRoom purpose) |

#### Examples

```js
import Modal from "library/src/components/Modal/modal";
```

A modal can be displayed without a button to trigger it:

```html
<Modal
  id="testid"
  title="A wild modal has appeared"
  button="Trigger"
  show_dialog="true"
>
  <p>
    <center>
      Do you want to spawn another modal?<br />
      ...<br />
      <b><i>Are you sure ...?</i></b>
    </center>
  </p>
</Modal>
```

<div>
  <Modal
    id="testid"
    title="A wild modal has appeared"
    button="Trigger"
    show_dialog="true"
  >
    <p>
      <center>
        Do you want to spawn another modal?<br />
        ...<br />
        <b><i>Are you sure ...?</i></b>
      </center>
    </p>
  </Modal>
</div>

Modal with a button as its trigger (you can try it lol):

```js
import Modal from "library/src/components/Modal/modal";
import ModalButton from "library/src/components/Modal/modalbutton";
```

```html
<ModalButton
  id="documentation-modal-normal"
  action="console.log('the modal opened')"
>
  Open Modal
</ModalButton>
<Modal
  id="documentation-modal-normal"
  title="A wild modal has appeared"
  button="Trigger"
  action="console.log('you triggered it you monster ........ AGAIN :O')"
>
  <p>
    <center>
      Do you want to spawn another modal <b>AGAIN</b>?<br />
      ...<br />
      <b><i>Are you sure :( ...?</i></b>
    </center>
  </p>
</Modal>
```

<ModalButton id="documentation-modal-normal" action="console.log('the modal opened')">
  Open Modal
</ModalButton>

<div>
  <Modal
    id="documentation-modal-normal"
    title="A another wild modal has appeared"
    button="Trigger"
    action="console.log('you triggered it you monster ........ AGAIN :O')"
  >
    <p>
      <center>
        Do you want to spawn another modal <b>AGAIN</b>?<br />
        ...<br />
        <b><i>Are you sure :( ...?</i></b>
      </center>
    </p>
  </Modal>
</div>

The button can also be displayed as normal text:

```html
<ModalButton
  id="documentation-modal-invisible-button"
  action="console.log('the modal again opened')"
  invisible="true"
>
  Open Modal Open Modal Again
</ModalButton>
```

<ModalButton id="documentation-modal-invisible-button" action="console.log('the modal again opened')" invisible="true">
Open Modal Again
</ModalButton>

<div>
  <Modal
    id="documentation-modal-invisible-button"
    title="And another one again wild modal has appeared"
    button="Trigger"
    action="console.log('you triggered it again you **** ******* ........ AGAIN :O')"
  >
    <p>
      <center>
        Do you want to spawn AGAIN another modal <b>AGAIN</b>?<br />
        ...<br />
        <b><i>Are you sure :( ...?</i></b> <small>pls no</small>
      </center>
    </p>
  </Modal>
</div>
