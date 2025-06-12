import { RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("*", "./error-boundary.tsx"),
  index("./routes/dashboard/dashboard.tsx"),
  route(
    "image-to-icon-converter",
    "./routes/tools/image-to-icon-converter/image-to-icon-converter.tsx"
  )
] satisfies RouteConfig;
