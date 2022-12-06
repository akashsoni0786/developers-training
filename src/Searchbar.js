import React, { useState, useRef, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Frame, Text, TextField } from "@shopify/polaris";
import { fetching } from "./custom";
import { useDispatch, useSelector } from "react-redux";
import { alldata, changePage, totalRowCount } from "./store/slices/Slice";
import { GridList } from "./GridList";
import TableSkeleton from "./TableSkeleton";
const Searchbar = () => {
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);
  const [pageChange, setPageChange] = useState(20);
  const dispatch = useDispatch();
  const ref = useRef();
  const rowCount = useSelector((state) => state.storeWork.rowCount);
  const totalRows = useSelector((state) => state.storeWork.totalRow);
  const page = useSelector((state) => state.storeWork.page_no);
  let url = new URL(
    `https://jsonplaceholder.typicode.com/todos?_limit=${rowCount}&_page=${page}`
  );
  let urlCountRow = new URL("https://jsonplaceholder.typicode.com/todos");
  // FOR INPUT FIELD
  const handleChange = (newValue) => {
    setValue(newValue);
    setLoad(true);
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      fetching(url).then((res) => {
        console.log(res);
      });
      setLoad(false);
    }, 1000);
  };
  useEffect(() => {
      // FOR GRID
      fetching(url).then((res) => {
        dispatch(alldata(res));
        let currentTotalPages = totalRows / rowCount;
        setPageChange(currentTotalPages);
      });
      // FOR ROW COUNT
      fetching(urlCountRow).then((res) => {
        dispatch(totalRowCount(res.length));
      });
  }, [page, rowCount]);
  // FOR PAGINATION
  const dec = () => {
    if (page > 1) {
      dispatch(changePage(page - 1));
    }
  };
  const inc = () => {
    if (page < pageChange) {
      dispatch(changePage(page + 1));
    }
  };
  return (
    <Frame>
      <TextField
        label="Type here......"
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      <Text variant="heading4xl" as="h2" alignment="center">
        Data Grid
      </Text>
      {load ? (
        <Frame>
          <TableSkeleton />
        </Frame>
      ) : (
        <GridList
          page={page + "/" + pageChange}
          decrease={dec}
          increase={inc}
        />
      )}
    </Frame>
  );
};
export default Searchbar;
