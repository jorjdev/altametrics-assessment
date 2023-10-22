import React, { ReactNode } from "react";

interface OutletContainer {
  children: ReactNode;
  className: string;
}

const OutletContainer: React.FC<OutletContainer> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export default OutletContainer;
