import { useEffect, useRef, useState } from "react";
import "./Index.css";
import Tokenizer from "../utils/tokenizer";
import TfIdf from "../utils/tfidf";

function Index() {
    const [query, setQuery] = useState<string>("");
    const texts: string[] = ["りんごとみかん、みかんとバナナ", "りんごとバナナ、バナナとキウィ"];
    const kuromoji = useRef<Tokenizer | null>(null);
    const tfidf = new TfIdf();

    const [tokenArrays, setTokenArrays] = useState<string[][]>([]);
    const [idf, setIdf] = useState<number[]>([]);

    /**
     * ページがローディングされた時に１回実行
     * kuromojiを使うための準備を行う。
     */
    useEffect(() => {
        const initialize = async () => {
            const instance = new Tokenizer();
            await instance.init(); // 非同期初期化メッソード呼び出し
            kuromoji.current = instance;

            // 文書からtokenを抽出し、それらをtokenArraysに入れる
            const tokensFromDocuments: string[][] = [];
            texts.forEach(text => {
                tokensFromDocuments.push(kuromoji.current!.tokenize(text));
            });
            setTokenArrays(tokensFromDocuments);

            tfidf.init(tokensFromDocuments);

            // setVocabularysがまだ反映されていないので、vocabularySetをArrayにして入れる
            tfidf.calculateTf(tokensFromDocuments[0], [...vocabularySet]);
        };

        initialize();
    }, []);

    const extractTokensFromText = (text: string) => {
        const tokens = kuromoji.current!.tokenize(text);

        return tokens;
    };

    const handleEnterKeyPress = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
        }
    };

    return (
        <div id="wrapper">
            <div id="input-section">
                <h1 style={{ fontFamily: 'Montserrat' }}>TF-IDF</h1>
                <p>Input text</p>
                <textarea
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                    }}
                    rows={4}
                    onKeyDown={handleEnterKeyPress}
                />
                {/* <p>{query}</p> */}
            </div>
            <div id="content-section"></div>
        </div >
    );
}

export default Index;
