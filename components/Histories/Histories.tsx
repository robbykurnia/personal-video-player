import { HISTORIES_KEY, HistoryData } from "@/constants"
import { useEffect, useState } from "react"

const Histories = () => {
    const [histories, setHistories] = useState<HistoryData[]>([])
    useEffect(() => {
        const data = localStorage.getItem(HISTORIES_KEY)
        if (!data) return

        const historiesData = (JSON.parse(data) as HistoryData[]).sort((a, b) => {
            if (a.dateModified < b.dateModified) {
                return 1;
            }
            if (a.dateModified > b.dateModified) {
                return -1;
            }
            return 0
        })

        setHistories(historiesData)


    }, [])
    return (
        <table className="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Time</th>
                    <th>Date Modified</th>
                </tr>
            </thead>
            <tbody>
                {histories.map((history) => (
                    <tr>
                        <td>{history.title}</td>
                        <td>{history.lastTime}</td>
                        <td>{new Date(history.dateModified).toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Histories