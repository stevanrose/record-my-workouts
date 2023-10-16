import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { AppBar, Button, Container, Link, Toolbar, Typography } from '@mui/material';
import moment from "moment";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 260 },
    { field: 'trainer', headerName: 'Trainer', width: 160 },
    {
        field: 'startDate', headerName: 'Start Date', width: 150,
        valueFormatter: params =>
            moment(params?.value).format("Do MMMM YYYY"),
    },
    {
        field: 'endDate', headerName: 'End Date', width: 150,
        valueFormatter: params =>
            moment(params?.value).format("Do MMMM YYYY"),
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
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Company name
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Features
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Enterprise
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Support
                        </Link>
                    </nav>
                    <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    The Sweatshop
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Quickly build an effective exercise programme to enble you to reach your potential.
                </Typography>
            </Container>
            <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Programmes
            </Typography>
            <Container disableGutters maxWidth="lg" component="main" lg={{ pt: 8, pb: 6 }}>
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
}

export default List;