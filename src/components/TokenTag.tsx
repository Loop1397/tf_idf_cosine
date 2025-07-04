import "./TokenTag.css";

function TokenTag({ tokens }: { tokens: string[] }) {
    return (<div style={{ marginTop: "5px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {tokens.map(token => <div className="token-tag">{token}</div>)}
    </div>);
}

export default TokenTag;