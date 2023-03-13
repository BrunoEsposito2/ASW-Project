import cors from "cors";

const express = require('express')

export const chatRouter = express.Router();
chatRouter.use(cors());

chatRouter.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!');
})

