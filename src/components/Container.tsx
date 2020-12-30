import React, { Fragment, ReactNode } from "react";

const className = "container";

export type Props = {
  children: ReactNode;
};

export const Container: React.FC<Props> = (props: Props) => (
  <Fragment>
    <div className={className}>{props.children}</div>
    <style jsx>{`
      .${className} {
        padding: 24px;
        width: 100%;
        margin: 0 auto;
      }

      @media screen and (min-width: 640px) {
        .${className} {
          width: 640px;
          margin: 0 auto;
        }
      }
    `}</style>
  </Fragment>
);
