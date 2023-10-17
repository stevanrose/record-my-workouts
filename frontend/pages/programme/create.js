import React, { useEffect } from "react";
// import reactDom from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  AppBar,
  Button,
  Container,
  Field,
  Grid,
  Link,
  Toolbar,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const errorSummaryRef = React.createRef();

export default function Create() {
  const ValidationSchema = yup.object().shape({
    name: yup.string().required("Programme name is required"),
    description: yup.string().required("Programme description is required"),
    trainer: yup.string().required("Trainer is required"),
    startDate: yup.date().required("Start Date is required"),
    endDate: yup.date().required("End Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      trainer: "",
      startDate: dayjs(Date.now()),
      endDate: dayjs(Date.now()),
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ValidationSchema,

    onSubmit: (values) => {
      console.log("Posting to API: ", JSON.stringify(values, null, 2));
      const res = fetch("/api/programme/create", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify(values),
      });
      formik.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.isSubmitting && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [formik.errors, formik.isSubmitting]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
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
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          The Sweatshop
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Quickly build an effective exercise programme to enble you to reach
          your potential.
        </Typography>
      </Container>
      <Typography
        component="h4"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Create a Programme
      </Typography>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sm={{ pt: 8, pb: 6 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container direction={"column"} spacing={5}>
            <Grid item>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                type="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="trainer"
                name="trainer"
                label="Trainer"
                type="trainer"
                value={formik.values.trainer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.trainer && Boolean(formik.errors.trainer)}
                helperText={formik.touched.trainer && formik.errors.trainer}
              />
            </Grid>
            <Grid item>
              <DatePicker
                label="Start Date"
                id="startDate"
                name="startDate"
                value={formik.values.startDate}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                }
                helperText={formik.touched.startDate && formik.errors.startDate}
                onChange={(value) => {
                  formik.setFieldValue("startDate", Date.parse(value));
                }}
                slotProps={{ textField: { variant: "outlined" } }}

                // renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item>
              <DatePicker
                label="End Date"
                id="endDate"
                name="endDate"
                value={formik.values.endDate}
                onBlur={formik.handleBlur}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                onChange={(value) => {
                  formik.setFieldValue("endDate", Date.parse(value));
                }}
                slotProps={{ textField: { variant: "outlined" } }}
                // renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </LocalizationProvider>
  );
}
