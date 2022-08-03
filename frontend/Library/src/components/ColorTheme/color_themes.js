class ColorThemes {
  constructor({
    updateSelected = undefined,
    setCustomColors = undefined,
    id = "popholmes",
  }) {
    this.themes = [
      {
        name: "Default",
        value: "default",
        default: true,
      },
      {
        name: "White",
        value: "white",
        default: false,
      },
      {
        name: "Saturated",
        value: "saturated",
        default: false,
      },
      {
        name: "Night",
        value: "night",
        default: false,
      },
    ];

    this.updateSelected = updateSelected;
    this.setCustomColors = setCustomColors;
    this.id = id;
  }

  update = () => {
    let color_theme_value = this.getLocalstorage();

    if (this.isJSON(color_theme_value)) {
      // custom color theme
      this.setCustomTheme(JSON.parse(color_theme_value));
    } else if (
      this.themes.filter((theme) => theme.value === color_theme_value)
        .length !== 0
    ) {
      this.setTheme(color_theme_value);
    } else {
      let default_theme = this.themes.filter(
        (theme) => theme.default === true
      )[0];
      this.setTheme(default_theme.value);
    }
  };

  set = (theme) => {
    this.setLocalstorage(theme);
    this.update();
  };

  setCustom = (colors) => {
    this.setLocalstorage(JSON.stringify(colors));
    this.update();
  };

  setCustomTheme = (colors) => {
    let root = document.documentElement;

    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--background_light", colors.background_light);
    root.style.setProperty(
      "--background_container",
      colors.background_container
    );
    root.style.setProperty("--highlight", colors.highlight);
    root.style.setProperty("--text", colors.text);
    root.style.setProperty("--text_light", colors.text_light);
    root.style.setProperty("--text_dark", colors.text_dark);

    if (this.updateSelected) this.updateSelected("Custom");
    if (this.setCustomColors) this.setCustomColors(colors);
  };

  setTheme = (theme) => {
    let root = document.documentElement;

    root.style.setProperty("--background", "var(--" + theme + "_background)");
    root.style.setProperty(
      "--background_light",
      "var(--" + theme + "_background_light)"
    );
    root.style.setProperty(
      "--background_container",
      "var(--" + theme + "_background_container)"
    );
    root.style.setProperty("--highlight", "var(--" + theme + "_highlight)");
    root.style.setProperty("--text", "var(--" + theme + "_text)");
    root.style.setProperty("--text_light", "var(--" + theme + "_text_light)");
    root.style.setProperty("--text_dark", "var(--" + theme + "_text_dark)");

    if (this.updateSelected)
      this.updateSelected(this.themes.find((t) => t.value === theme).name);
    if (this.setCustomColors) {
      let computed = getComputedStyle(root);

      let colors = {
        background: computed
          .getPropertyValue("--" + theme + "_background")
          .trim(),
        background_light: computed
          .getPropertyValue("--" + theme + "_background_light")
          .trim(),
        background_container: computed
          .getPropertyValue("--" + theme + "_background_container")
          .trim(),
        highlight: computed
          .getPropertyValue("--" + theme + "_highlight")
          .trim(),
        text: computed.getPropertyValue("--" + theme + "_text").trim(),
        text_light: computed
          .getPropertyValue("--" + theme + "_text_light")
          .trim(),
        text_dark: computed
          .getPropertyValue("--" + theme + "_text_dark")
          .trim(),
      };
      this.setCustomColors(colors);
    }
  };

  setLocalstorage(color_scheme) {
    localStorage.setItem("color_theme_" + this.id, color_scheme);
  }

  getLocalstorage() {
    return localStorage.getItem("color_theme_" + this.id);
  }

  isJSON = (str) => {
    try {
      return JSON.parse(str) && !!str;
    } catch (e) {
      return false;
    }
  };
}

export default ColorThemes;
