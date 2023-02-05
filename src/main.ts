import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "@formily/antdv-x3/dist/antdv-x3.css";
import "ant-design-vue/dist/antd.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.mount("#app");
