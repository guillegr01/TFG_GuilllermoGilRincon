import express from 'express'

import { router as userRouter } from './routers/userRoutes';
import { router as glucoseRegisterRouter } from './routers/glucoseRegisterRouter';
import { router as carbohydrateIntakeRouter } from './routers/carbohydrateIntakeRouter';
import { router as therapyRouter } from './routers/therapyRouter';
import { router as dashboardRouter } from './routers/dashboardRouter';
import { router as statsRouter } from './routers/statsRouter';


const app = express();
app.use(express.json());


//ROUTES
app.use("/user", userRouter);
app.use("/glucose-register", glucoseRegisterRouter);
app.use("/meals", carbohydrateIntakeRouter);
app.use("/therapy", therapyRouter);
app.use("/dashboard", dashboardRouter);
app.use("/stats", statsRouter);

//endpoint prueba
app.get('/ping', (req, res) => {
    res.json("Server running on Cloud...");
});

export default app;