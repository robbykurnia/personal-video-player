import { HISTORIES_KEY, HistoryData } from "@/constants"
import { useEffect, useState } from "react"

const Histories = () => {
    const [histories, setHistories] = useState<HistoryData[]>([])
    useEffect(() => {
        const data = localStorage.getItem(HISTORIES_KEY)
        if (!data) return

        setHistories(JSON.parse(data))


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