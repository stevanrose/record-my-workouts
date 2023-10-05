import React, { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import MaterialReactTable from "material-react-table";

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

        setprogrammes(json.data.results);
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "programmeData.name",
        header: "Programme Name",
      },
      {
        accessorKey: "programmeData.description",
        header: "Description",
      },
      {
        accessorKey: "programmeData.trainer",
        header: "Trainer",
      },
      {
        accessorKey: "programmeData.startDate",
        header: "Start Date",
      },
    ],
    []
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" mt={4} gutterBottom>
        My programmes
      </Typography>

      <MaterialReactTable
        columns={columns}
        data={programmes}
        manualPagination
        onPaginationChange={setPagination}
        rowCount={rowCount}
        state={{
          isLoading,
          pagination,
        }}
      />
    </Container>
  );
};

export default List;
