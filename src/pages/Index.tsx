import { useEffect, useRef, useState } from "react";
import "./Index.css";
import Tokenizer from "../utils/tokenizer";
import type { Token } from "../types/Token";

function Index() {
    const [query, setQuery] = useState<string>("");
    const texts: string[] = ["りんごとみかん、みかんとバナナ", "りんごとバナナ、バナナとキウィ"];
    const kuromoji = useRef<Tokenizer | null>(null);

    const [test, setTest] = useState<Token[]>([]);

    /**
     * ページがローディングされた時に１回実行
     * kuromojiを使うための準備を行う。
     */
    useEffect(() => {
        const initialize = async () => {
            const instance = new Tokenizer();
            await instance.init(); // 非同期初期化メッソード呼び出し
            kuromoji.current = instance;

            const result = await kuromoji.current.tokenize(texts[0]);
            setTest(result);
        };

        initialize();
    }, []);

    const extractIndexWordFromText = (text: string) => {
        const tokens = kuromoji.current?.tokenize(text);
        const indexWords = kuromoji.current?.extractIndexWord(tokens);

        return indexWords;
    };

    const handleEnterKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            extractIndexWordFromText(query);
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
