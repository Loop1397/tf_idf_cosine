import * as kuromoji from "@patdx/kuromoji";
import type { Token } from "../types/Token";

// kuromojiを使うためのclass
class KuromojiServices {
    private tokenizer: any;

    constructor() {}

    /**
     * 初期化に必要なメッソード(ex - TokenizerBuilder.build())が非同期処理を必要とするが、
     * constructor内では非同期の処理ができないため、
     * 初期化のためのinitメッソードを実装し、
     * 初期化をせずに他のメッソードを実行したらエラーが出るように作成する。
     */
    public init = async (): Promise<void> => {
        if (this.tokenizer) return;

        const myLoader: kuromoji.LoaderConfig = {
            async loadArrayBuffer(url: string): Promise<ArrayBufferLike> {
                // .gz 확장자를 제거합니다.
                url = url.replace(".gz", "");
                const res = await fetch("https://cdn.jsdelivr.net/npm/@aiktb/kuromoji@1.0.2/dict/" + url);
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${url}, status: ${res.status}`);
                }
                return res.arrayBuffer();
            },
        };

        this.tokenizer = await new kuromoji.TokenizerBuilder({
            loader: myLoader,
        }).build();
    };

    public tokenize = (text: string) => {
        if (!this.tokenizer) {
            throw new Error("Tokenizerが初期化されていません。 先にinit()メッソードを実行してください。");
        }

        // 形態素解析
        const tokens = this.tokenizer.tokenize(text);
        console.log(tokens);

        return tokens;
    };

    /**
     * kuromojiによって形態素解析された結果からある品詞の単語を抽出するメッソード
     * 抽出される単語のdefault品詞は名詞になっているが、必要によって他の品詞に変えることもできる。
     */
    public extractIndexWord = (tokens: Token[], wordClass: string = "名詞") => {
        const indexWords = tokens
            .filter(token => token.pos === wordClass)
            .map(token => {
                return token.basic_form;
            });

        return indexWords;
    };
}

export default KuromojiServices;
