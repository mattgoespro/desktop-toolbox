import type { Configuration } from "webpack";

export const commonConfig: Configuration = {
  output: {
    clean: true
  },
  cache: {
    type: "filesystem"
  }
};
