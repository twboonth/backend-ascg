import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/rental", async (req: Request, res: Response) => {
  try {
    // console.log("req",req);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const customerName = (req.query.customerName as string) || "";
    const startDate = (req.query.startDate as string) || "";
    const endDate = (req.query.endDate as string) || "";

    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};

    if (customerName || startDate || endDate) {
      where.rentalContract = {};

      if (customerName) {
        where.rentalContract.customerName = {
          contains: customerName,
        };
      }

      if (startDate) {
        where.rentalContract.startDate = {
          gte: new Date(startDate),
        };
      }

      if (endDate) {
        where.rentalContract.endDate = {
          lte: new Date(endDate),
        };
      }
    }

    const cars = await prisma.vehicle.findMany({
      where,
      include: {
        rentalContract: true,
      },
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    });

    // Get total count for pagination
    const totalCount = await prisma.vehicle.count({ where });
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      data: cars,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

export default router;
