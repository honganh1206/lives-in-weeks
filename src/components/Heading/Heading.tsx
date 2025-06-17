import React from "react";
import styles from "./heading.module.css";

const Heading = ({
  children,
  Tag,
}: {
  children: string;
  Tag: "h1" | "h2";
  urlKey: string;
}) => {
  const [heading] = React.useState<string>(children);

  return (
    <Tag
      className={Tag === "h1" ? styles.h1 : styles.h2}
      contentEditable={false}
    >
      {heading}
    </Tag>
  );
};

export default Heading;
