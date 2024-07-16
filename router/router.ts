import { Application } from "express";
import userRouter from "./user/user.router";
import chatRouter from "./chat/chat.router";

class AppRouter {
    constructor(private app: Application) {}
  
    init() {
      this.app.get('/', (_req, res) => {
        res.send('API Running');
      });
      this.app.use('/api/user', userRouter);
      this.app.use('/api/chat', chatRouter);
    }
  }
  
  export default AppRouter;