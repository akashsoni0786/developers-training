import {
  Card,
  SkeletonTabs,
} from "@shopify/polaris";
import React from "react";

const TableSkeleton = () => {
  return (
    <div className="table-skeleton">
      <Card sectioned>
        {Array(10)
          .fill(0)
          .map((i, key) => {
            return <SkeletonTabs key={key} count={8} />;
          })}
      </Card>
    </div>
  );
};

export default TableSkeleton;
