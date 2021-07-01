/**
 * libs
 */
import { useContext } from "react";

/**
 * locals
 */
import { REPORT } from "../pages/Feature";

/**
 * let's go
 */
export default () => {
  /* use id(filename) as the keyword to query the neo4j */

  const id = useContext(REPORT)._id;

  const url_for_kg = "http://10.112.209.170:8080/?name=";

  /* use iframe to embed sub html => fantasy! */
  return (
    <iframe
      width="100%"
      height="650"
      src={url_for_kg + id}
      scrolling="no"
      title="关联分析"
    />
  );
};
