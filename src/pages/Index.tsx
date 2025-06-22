import { useEffect, useRef, useState } from "react";
import "./Index.css";
import KuromojiServices from "../services/kuromojiService";

function Index() {
    const [text, setText] = useState<string>("");
    const texts: string[] = ["りんご みかん みかん バナナ", "りんご バナナ バナナ キウィ"];
    const kuromoji = useRef<KuromojiServices | null>(null);

    const [test, setTest] = useState<any>();

    /**
     * ページがローディングされた時に１回実行
     * kuromojiを使うための準備を行う。
     */
    useEffect(() => {
        const initialize = async () => {
            const instance = new KuromojiServices();
            await instance.init(); // 非同期初期化メッソード呼び出し
            kuromoji.current = instance;

            const result = await instance.tokenize(texts[0]);
            setTest(result);
        };

        initialize();
    }, []);

    const handleEnterKeyPress = async () => {};

    return (
        <div>
            {/* <input
                value={text}
                onChange={e => {
                    setText(e.target.value);
                }}
                onKeyDown={handleEnterKeyPress}
            ></input> */}
            <p>{JSON.stringify(test)}</p>
        </div>
    );
}

export default Index;
