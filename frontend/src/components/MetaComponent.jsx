import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

function MetaComponent({
  title = "Perc Ikhlas",
  description = "Pusat Undangan",
}) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
}

export default MetaComponent;
