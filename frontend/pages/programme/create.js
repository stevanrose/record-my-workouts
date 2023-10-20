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

import Header from "../components/Header";
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
      <Header />

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
                format="DD/MM/YYYY"
                value={formik.values.startDate}
                onChange={(value) =>
                  formik.setFieldValue("startDate", value, true)
                }
                slotProps={{
                  textField: {
                    variant: "outlined",
                    error:
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate),
                    helperText:
                      formik.touched.startDate && formik.errors.startDate,
                  },
                }}
              />
            </Grid>

            <Grid item>
              <DatePicker
                label="End Date"
                format="DD/MM/YYYY"
                value={formik.values.endDate}
                onChange={(value) =>
                  formik.setFieldValue("endDate", value, true)
                }
                slotProps={{
                  textField: {
                    variant: "outlined",
                    error:
                      formik.touched.endDate && Boolean(formik.errors.endDate),
                    helperText: formik.touched.endDate && formik.errors.endDate,
                  },
                }}
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
