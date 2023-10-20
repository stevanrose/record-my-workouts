import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography } from "@mui/material";
import moment from "moment";
import Header from "../components/Header";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "description", headerName: "Description", width: 260 },
  { field: "trainer", headerName: "Trainer", width: 160 },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    valueFormatter: (params) => moment(params?.value).format("Do MMMM YYYY"),
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 150,
    valueFormatter: (params) => moment(params?.value).format("Do MMMM YYYY"),
  },
];

const List = () => {
  const [programmes, setprogrammes] = useState([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState({
    skip: 0,
    take: 10,
  });

  useEffect(() => {
    console.log("Using Effect");
    const fetchData = async () => {
      if (!programmes.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      try {
        const response = await fetch("/api/programme/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pagination),
        });
        const json = await response.json();

        setprogrammes(json.data.programmes);
        setRowCount(json.data.pagination.totalResults);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div>
      <Header />
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Programmes
      </Typography>
      <Container
        disableGutters
        maxWidth="lg"
        component="main"
        lg={{ pt: 8, pb: 6 }}
      >
        <DataGrid
          rows={programmes}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Container>
    </div>
  );
};

export default List;
