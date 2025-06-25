import { useEffect, useRef, useState } from "react";
import "./Index.css";
import Tokenizer from "../utils/tokenizer";
import type { Token } from "../types/Token";

function Index() {
    const [query, setQuery] = useState<string>("");
    const texts: string[] = ["りんごとみかん、みかんとバナナ", "りんごとバナナ、バナナとキウィ"];
    const kuromoji = useRef<Tokenizer | null>(null);

    const [test, setTest] = useState<Token[]>([]);

    const [tokenArrays, setTokenArrays] = useState<string[][]>();

    const [vocabularys, setVocabularys] = useState<string[]>([]);

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

            // 重なっているtokenを全て消したarrayをvocabularysに記入
            const vocabularySet = new Set(tokensFromDocuments.flat());
            setVocabularys([...vocabularySet]);
        };

        initialize();
    }, []);

    const extractTokensFromText = (text: string) => {
        const tokens = kuromoji.current!.tokenize(text);

        return tokens;
    };

    const handleEnterKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log(vocabularys);
        }
    };

    return (
        <div>
            <input
                value={query}
                onChange={e => {
                    setQuery(e.target.value);
                }}
                onKeyDown={handleEnterKeyPress}
            />
            <p>{query}</p>
        </div>
    );
}

export default Index;
