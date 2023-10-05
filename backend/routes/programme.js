const express = require("express");
const router = express.Router();
const Validator = require("../middlewares/Validator");

const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

router.delete("/:id", async (req, res, next) => {
  try {
    const programme = await prisma.programme.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(204);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const totalRecords = await prisma.programme.count();
    var pagination = {
      skip: parseInt(req.query.skip),
      take: parseInt(req.query.take),
      totalRecords,
      totalRecords,
    };

    const programmes = await prisma.programme.findMany({
      skip: pagination.skip,
      take: pagination.take,
    });

    var response = { programmes: programmes, pagination: pagination };
    console.log("===> " + JSON.stringify(response));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await prisma.programme.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    error.meta = { id: req.params.id };
    next(error);
  }
});

router.post("/", Validator("programmeSchema"), async (req, res, next) => {
  try {
    const programme = await prisma.programme.create({
      data: req.body,
    });
    console.log(`Successfully created new programme : ${programme.name}`);
    res.status(201).json(programme);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", Validator("programmeSchema"), async (req, res, next) => {
  try {
    const programme = await prisma.programme.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name || undefined,
        description: req.body.description || undefined,
        trainer: req.body.trainer || undefined,
        startDate: req.body.startDate || undefined,
        endDate: req.body.endDate || undefined,
      },
    });
    console.log(`Successfully updated programme : ${programme.name}`);
    res.status(200).json(programme);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
