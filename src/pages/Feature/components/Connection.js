import { useContext } from "react";

import { ReportContext } from "../context";

export default () => {
  /* use id(filename) as the keyword to query the neo4j */

  const id = useContext(ReportContext)._id;

  /* use iframe to embed sub html => fantasy! */
  return (
    <iframe
      width="100%"
      height="720px"
      src={`/kg/?name=${id}`}
      scrolling="no"
      title="关联分析"
    />
  );
};
