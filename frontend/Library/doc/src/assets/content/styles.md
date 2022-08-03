## Color Themes

Use a custom color theme for the project. It can change the color theme on the fly and remembers the theme for this user.

The `ColorThemesHook` injects the color theme into the website. It needs to be used with a router (see Examples).

The `ColorThemesPicker` enables the user to select a color theme and even create a custom one. It also remembers the last selected color theme and will set it whenever the site gets loaded.

#### Parameters (ColorThemesHook)

| name | type     | default     | comment                                                                                   |
| ---- | -------- | ----------- | ----------------------------------------------------------------------------------------- |
| id   | `string` | "popholmes" | required, used to differentiate between projects,<br /> that use this color theme utility |

#### Parameters (ColorThemesPicker)

| name | type     | default     | comment                                                                                   |
| ---- | -------- | ----------- | ----------------------------------------------------------------------------------------- |
| id   | `string` | "popholmes" | required, used to differentiate between projects,<br /> that use this color theme utility |

#### Examples

```js
import ColorThemesHook from "library/src/components/ColorTheme/color_themes_hook";
import ColorThemesPicker from "library/src/components/ColorTheme/color_themes_picker";
```

**ColorThemesHook:**

Inject the color theme using a router:

```js
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ColorThemesHook from "library/src/components/ColorTheme/color_themes_hook";

import Page1 from "./page1";
import Page2 from "./page2";

const Router = ({ history }) => {
  return (
    <BrowserRouter history={history}>
      <ColorThemesHook id="library-documentation">
        <Switch>
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
        </Switch>
      </ColorThemesHook>
    </BrowserRouter>
  );
};

export default Router;
```

The `ColorThemesHook` has to be placed between the `BrowserRouter` and the `Switch`.

**ColorThemesPicker**

The `ColorThemesPicker` can be placed where you want and how many times you want.

_!The id of the hook and the picker needs to match, otherwise the picker wont work!_

```html
<ColorThemesPicker id="library-documentation" />
```

<ColorThemesPicker id="library-documentation"></ColorThemesPicker>
