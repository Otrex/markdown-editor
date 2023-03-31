import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import SvgVue from "./components/utility/Svg.vue";

createApp(App).component("app-svg", SvgVue).mount("#app");
