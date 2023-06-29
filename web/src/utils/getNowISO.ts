import dayjs from "dayjs";

export default function getNowISO () {
    return dayjs().toISOString()
}