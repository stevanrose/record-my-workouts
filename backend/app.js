const express = require("express");
const createHttpError = require("http-errors");
const { PrismaError } = require("prisma-error-enum");
const app = express();

const programmeRouter = require("./routes/programme");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/programme", programmeRouter);

app.use((req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || `Internal server error`;

  if (err.code === PrismaError.UniqueConstraintViolation) {
    status = 409;
    message = `programme already exists with this email: ${req.body.email}`;
  }

  if (err.code === PrismaError.RecordsNotFound) {
    status = 404;
    message = `Programme not found with id: ${err.meta.id}`;
  }

  res.status(status).json({
    error: {
      status: status,
      message: message,
    },
  });
});

const port = process.env.PORT || 3060;
app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
