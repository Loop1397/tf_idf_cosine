import type { Data } from "../types/Data";
import "./ResultTable.css";
import TokenTag from "./TokenTag";

function ResultTable({ dataArray, searchQuerys }: { dataArray: Data[], searchQuerys: string[] }) {
    const matchedTokens: string[][] = dataArray.map(data => {
        return searchQuerys.filter(query => data.tokenArray.includes(query));
    });

    return (
        <table>
            <thead>
                <tr>
                    <td>
                        <h3>Document</h3>
                    </td>
                    <td>
                        <h3>Cosine similartiy</h3>
                    </td>
                    <td>
                        <h3>Matched tokens</h3>
                    </td>
                </tr>
            </thead>
            <tbody>
                {dataArray.map((data, i) => (
                    <tr
                        key={data.documentIndex}
                    >
                        <td>{data.documentIndex}</td>
                        <td>{data.result.toFixed(8)}</td>
                        <td>{<TokenTag tokens={matchedTokens[i]} />}</td>
                    </tr>
                ))}
            </tbody>
        </table>);
}

export default ResultTable;