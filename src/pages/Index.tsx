import { useEffect, useRef, useState } from "react";
import "./Index.css";
import Tokenizer from "../utils/tokenizer";
import TfIdf from "../utils/tfidf";
import Similarity from "../utils/similarity";
import TokenTag from "../components/TokenTag";
import type { Data } from "../types/Data";



function Index() {
    const [query, setQuery] = useState<string>("");
    const [searchQuerys, setSearchQuerys] = useState<string[]>([]);
    const kuromoji = useRef<Tokenizer | null>(null);
    const tfIdf = useRef<TfIdf | null>(null);
    const similarity = useRef<Similarity | null>(null);

    const [tokenArrays, setTokenArrays] = useState<string[][]>([]);
    const texts: string[] = ["りんごとみかん、みかんとバナナ", "りんごとバナナ、バナナとキウィ"];
    const [dataArray, setDataArray] = useState<Data[]>(
        texts.map(text => ({
            text,
            tokenArray: [],
            tfIdfArray: [],
            result: 0
        }))
    );
    /**
     * ページがローディングされた時に１回実行
     * kuromojiを使うための準備を行い、
     * 文章(texts)からのtokenを抽出し、TFを求める。
     */
    useEffect(() => {
        const initialize = async () => {
            // utilクラスの初期化
            const instance = new Tokenizer();
            await instance.init(); // 非同期初期化メッソード呼び出し
            kuromoji.current = instance;
            tfIdf.current = new TfIdf();
            similarity.current = new Similarity();

            // 文書からtokenを抽出し、それらをtokenArraysに入れる
            const tokenArraysTmp: string[][] = texts.map(text => {
                return kuromoji.current!.tokenize(text);
            });

            // 文書に出た全ての単語(vocabulary)とIDFをセット
            tfIdf.current.init(tokenArraysTmp);

            // 各文章のTfを計算する
            const tfIdfArraysTmp = tokenArraysTmp.map(tokens => {
                return tfIdf.current!.calculateTfIdf(tokens);
            });

            const newDataArray = texts.map((text, i) => ({
                text,
                tokenArray: tokenArraysTmp[i],
                tfIdfArray: tfIdfArraysTmp[i],
                result: 0,
            }));

            setDataArray(newDataArray);
        };

        initialize();
    }, []);

    const handleEnterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            // 重なっているqueryを処理するためにSetを使う。
            setSearchQuerys([...new Set(kuromoji.current!.tokenize(query))]);
            const queryTf = extractTfFromText(query);
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
                {searchQuerys.length !== 0 ?
                    <div>
                        <p>Search query</p>
                        <TokenTag tokens={searchQuerys} />
                    </div> : null}

            </div>
            <div id="content-section"></div>
        </div >
    );
}

export default Index;
