
import { Prisma, PrismaClient } from '@prisma/client'
import cors from "cors";

import express, { Request, Response } from 'express';
import RentalRoutes from "./routes/rental";
const app = express()

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your Next.js frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});
app.use("/api", RentalRoutes);

app.listen(4000, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000
`),
)
