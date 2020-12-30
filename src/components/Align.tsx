import React, { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  p?: number;
  px?: number;
  py?: number;
  pr?: number;
  pl?: number;
  pt?: number;
  pb?: number;
  m?: number;
  mx?: number;
  my?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  align?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "justify-all"
    | "match-parent";
};

const BASE_SIZE = 1;

const spaceStyle = (
  propertyName: "margin" | "padding",
  all?: number,
  xAxios?: number,
  yAxios?: number,
  right?: number,
  left?: number,
  top?: number,
  bottom?: number
): string => {
  if (all) return `${propertyName}: ${BASE_SIZE * all}px;`;
  if (xAxios)
    return `
    ${propertyName}-left: ${BASE_SIZE * xAxios}px;
    ${propertyName}-right: ${BASE_SIZE * xAxios}px;`;
  if (yAxios)
    return `
    ${propertyName}-top: ${BASE_SIZE * yAxios}px;
    ${propertyName}-bottom: ${BASE_SIZE * yAxios}px;`;
  if (right) return ` ${propertyName}-right: ${BASE_SIZE * right}px;`;
  if (left) return ` ${propertyName}-left: ${BASE_SIZE * left}px;`;
  if (top) return ` ${propertyName}-top: ${BASE_SIZE * top}px;`;
  if (bottom) return ` ${propertyName}-bottom: ${BASE_SIZE * bottom}px;`;
  return "";
};

const className = "container";

export const Align: React.FC<Props> = (props: Props) => (
  <div className={className}>
    {props.children}
    <style jsx>{`
      .${className} {
        text-align: ${props.align || "start"};
        ${spaceStyle(
          "padding",
          props.p,
          props.px,
          props.py,
          props.pr,
          props.pl,
          props.pt,
          props.pb
        )}
        ${spaceStyle(
          "margin",
          props.m,
          props.mx,
          props.my,
          props.mr,
          props.ml,
          props.mt,
          props.mb
        )}
      }
    `}</style>
  </div>
);
