import type { Data } from "../types/Data";
import "./ResultTable.css";
import TokenTag from "./TokenTag";

function ResultTable({ dataArray, searchQuerys }: { dataArray: Data[], searchQuerys: string[] }) {
    const matchedTokens: string[][] = dataArray.map(data => {
        return searchQuerys.filter(query => data.tokenArray.includes(query));
    });

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
                {dataArray.map((data, i) => (
                    <tr
                        key={data.documentIndex}
                    >
                        <td>{data.documentIndex}</td>
                        <td>{data.result}</td>
                        <td>{<TokenTag tokens={matchedTokens[i]} />}</td>
                    </tr>
                ))}
            </tbody>
        </table>);
}

export default ResultTable;