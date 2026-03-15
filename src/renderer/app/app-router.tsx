import { createHashRouter, RouterProvider } from "react-router";
import IconSmith from "./routes/tools/iconsmith";
import EmojiArt from "./routes/tools/emoji-art";
import Shell from "./shell";
import Dashboard from "./routes/dashboard/dashboard";

export const routes = [
  {
    route: "/tools/iconsmith",
    name: "IconSmith",
    description: "Convert images to icons for use in your applications."
  },
  {
    route: "/tools/emoji-art",
    name: "Emoji Art",
    description: "Build emoji art on a grid canvas and copy it to your clipboard."
  }
];

const router = createHashRouter([
  {
    path: "/",
    Component: Shell,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: "tools",
        children: [
          {
            path: "iconsmith",
            Component: IconSmith
          },
          {
            path: "emoji-art",
            Component: EmojiArt
          }
        ]
      }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
