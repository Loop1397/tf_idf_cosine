import type { Data } from "../types/Data";
import "./ResultTable.css";

function ResultTable({ dataArray }: { dataArray: Data[] }) {
    return (
        <table style={{ width: "100%", marginTop: "30px" }}>
            <thead>
                <tr>
                    <td style={{ borderBottom: "solid 2px ##e7e9ec" }}>Document</td>
                    <td style={{ borderBottom: "solid 2px ##e7e9ec" }}>Cosine similartiy</td>
                    <td style={{ borderBottom: "solid 2px ##e7e9ec" }}>Matched tokens</td>
                </tr>
            </thead>
            <tbody>
                {dataArray.map((data) => (
                    <tr
                        key={data.documentIndex}
                    >
                        <td>{data.documentIndex}</td>
                        <td>{data.result}</td>
                        <td>{data.tokenArray}</td>
                    </tr>
                ))}
            </tbody>
        </table>);
}

export default ResultTable;