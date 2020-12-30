import React from "react";
import { colors } from "./colors";
import { textStyle } from "./textStyle";

export const globals = (
  <style jsx global>{`
    html,
    body {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      background-color: ${colors.white};
      color: ${colors.black};
      ${textStyle({ size: "m", weight: "regular" })}
    }

    * {
      box-sizing: border-box;
    }
  `}</style>
);
