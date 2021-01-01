import React, { Fragment } from "react";
import { CustomHead } from "../components/CustomHead";
import { textStyle } from "../styles/textStyle";

const classNames = {
  container: "container",
  title: "title",
  message: "message",
};

const Page: React.FC = () => (
  <Fragment>
    <CustomHead title="404 Not Found" />
    <div className={classNames.container}>
      <h1 className={classNames.title}>404 Not Found</h1>
      <p className={classNames.message}>
        お探しのページは見つかりませんでした。
      </p>
    </div>

    <style jsx>{`
      .${classNames.container} {
        text-align: center;
      }

      .${classNames.title} {
        ${textStyle({ weight: "bold", size: "l" })}
      }
      .${classNames.message} {
      }
    `}</style>
  </Fragment>
);

export default Page;
