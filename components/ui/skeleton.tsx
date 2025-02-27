// filepath: /c:/Users/luish/Desktop/Pet Shop Bihl Bless/petshop_bihlbless/components/ui/skeleton.tsx
import React from "react";
import classNames from "classnames";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={classNames("animate-pulse bg-gray-300", className)} />;
};

export default Skeleton;
