import * as prodConfig from "./prod.js";
import * as devConfig from "./dev.js";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
