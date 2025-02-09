import router from "express"
import fetch from "../controllers/journalController.js"

const journalRouter = router()

journalRouter.get("/fetch", fetch)

export default journalRouter