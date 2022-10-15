import focus from "../directives/focus.js";
import { color } from "../directives/color.js";

const globalDirectives = {
  install(app) {
    app.directive("focus", focus);
    app.directive("color", color);
  },
};

export { globalDirectives };
