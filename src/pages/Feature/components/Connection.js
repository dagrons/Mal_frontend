import { useContext } from "react";

import { ReportContext } from "../context";
import { KG_FRONTEND_URL, KG_BACKEND_URL } from "../../../config";

export default () => {
  /* use id(filename) as the keyword to query the neo4j */

  const id = useContext(ReportContext)._id;

  /* use iframe to embed sub html => fantasy! */
  return (
    <iframe
      width="100%"
      height="720px"
      src={`${KG_FRONTEND_URL}?url=${KG_BACKEND_URL}&name=${id}`}
      scrolling="no"
      title="关联分析"
    />
  );
};
