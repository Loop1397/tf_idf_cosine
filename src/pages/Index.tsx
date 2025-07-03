import { useEffect, useRef, useState } from "react";
import "./Index.css";
import Tokenizer from "../utils/tokenizer";
import TfIdf from "../utils/tfidf";
import Similarity from "../utils/similarity";

function Index() {
    const [query, setQuery] = useState<string>("");
    const texts: string[] = ["りんごとみかん、みかんとバナナ", "りんごとバナナ、バナナとキウィ"];
    const kuromoji = useRef<Tokenizer | null>(null);
    const tfIdf = useRef<TfIdf | null>(null);
    const similarity = useRef<Similarity | null>(null);

    const [tokenArrays, setTokenArrays] = useState<string[][]>([]);
    const [tfArrays, setTfArrays] = useState<number[][]>([]);

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
            setTokenArrays(tokenArraysTmp);

            // 文書に出た全ての単語(vocabulary)とIDFをセット
            tfIdf.current.init(tokenArraysTmp);

            // 各文章のTfを計算する
            const tfArraysTmp = tokenArraysTmp.map(tokens => {
                return tfIdf.current!.calculateTf(tokens);
            });
            setTfArrays(tfArraysTmp);
            console.log(tokenArraysTmp);
            console.log(tfArraysTmp);
        };

        initialize();
    }, []);

    const extractTfFromText = (text: string): number[] => {
        const tokens = kuromoji.current!.tokenize(text);

        return tf;
    };

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
                {/* <p>{query}</p> */}
            </div>
            <div id="content-section"></div>
        </div >
    );
}

export default Index;
