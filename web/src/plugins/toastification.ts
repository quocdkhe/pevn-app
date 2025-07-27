// src/plugins/toastification.ts
import Toast, { type PluginOptions, POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options: PluginOptions = {
  // Customize as needed
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
};

export default {
  install(app: any) {
    app.use(Toast, options);
  },
};
