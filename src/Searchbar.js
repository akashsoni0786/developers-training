import React, { useState, useRef, useEffect } from "react";
import "@shopify/polaris/build/esm/styles.css";
import { Frame, Text, TextField } from "@shopify/polaris";
import { fetching } from "./custom";
import { useDispatch, useSelector } from "react-redux";
import {
  alldata,
  changePage,
  changeRowCount,
  totalRowCount,
} from "./store/slices/Slice";
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
  const pages = useSelector((state) => state.storeWork.page_no);
  // FOR INPUT FIELD
  const handleChange = (newValue) => {
    setValue(newValue);
    setLoad(true);
    clearTimeout(ref.current);
    let url = new URL(
      `https://jsonplaceholder.typicode.com/todos?_limit=${rowCount}&_page=${pages}`
    );
    ref.current = setTimeout(() => {
      fetching(url).then((res) => {
        console.log(res);
      });
      setLoad(false);
    }, 1000);
  };
  const fetchData = () => {
    let url = new URL(
      `https://jsonplaceholder.typicode.com/todos?_limit=${rowCount}&_page=${pages}`
    );
    fetching(url).then((res) => {
      dispatch(alldata(res));
      let currentTotalPages = totalRows / rowCount;
      setPageChange(currentTotalPages);
    });
    // FOR ROW COUNT
    let urlCountRow = new URL("https://jsonplaceholder.typicode.com/todos");
    fetching(urlCountRow).then((res) => {
      dispatch(totalRowCount(res.length));
    });
  };
  useEffect(() => {
    // FOR GRID

    let currentTotalPages = totalRows / rowCount;
    if (pages > currentTotalPages) {
      dispatch(changePage(1));
      if(pages === 1){
        fetchData();
      }
    } else {
      fetchData()
    }
  }, [pages, rowCount]);
  // FOR PAGINATION
  const dec = () => {
    if (pages > 1) {
      dispatch(changePage(pages - 1));
    }
  };
  const inc = () => {
    if (pages < pageChange) {
      dispatch(changePage(pages + 1));
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
          page={pages + "/" + pageChange}
          decrease={dec}
          increase={inc}
        />
      )}
    </Frame>
  );
};
export default Searchbar;
