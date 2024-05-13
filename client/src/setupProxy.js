import { createProxyMiddleware } from "http-proxy-middleware";
export const proxy = (app) => {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
