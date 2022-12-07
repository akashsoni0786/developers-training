import {
  Page,
  Card,
  DataTable,
  Pagination,
  Select,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, changeRowCount } from "./store/slices/Slice";
import TableSkeleton from "./TableSkeleton";

export const GridList = (props) => {
  const gridData = useSelector((state) => state.storeWork.gridData);
  const [gridList, setGridList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let list = [];
    gridData.map((i, key) => {
      let boolVal = i.completed ? "Done" : "On progress";
      list = [...list, [i.id, i.userId, i.title, boolVal]];
    });
    setGridList(list);
  }, [gridData]);
  const [selected, setSelected] = useState("10");
  const handleSelectChange = useCallback((value) => {
    setSelected(value);
      dispatch(changeRowCount(value));
  }, []);

  const options = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "40", value: "40" },
  ];
  return (
    <Page>
      <Card sectioned>
       <div className="select-pagination">
       <Select
          sectioned
          options={options}
          onChange={handleSelectChange}
          value={selected}
        />
        <Pagination
          label={props.page}
          hasPrevious
          onPrevious={() => {
            props.decrease();
          }}
          hasNext
          onNext={() => {
            props.increase();
          }}
        />
       </div>
        {gridList === [] ? (
          <TableSkeleton />
        ) : (
          <DataTable
            columnContentTypes={["numeric", "numeric", "text", "bool"]}
            headings={["Id", "User ID", "Title", "Completed"]}
            rows={gridList}
          />
        )}
      </Card>
    </Page>
  );
};
