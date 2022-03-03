import logger from "pino";
import dayjs from "dayjs";

// Using pino logger for more informative prints
const log = logger({
    base: {
        pid: false,
    },
    timestamp: ()=> `,"time":"${dayjs().format()}"`,
})

export default log;