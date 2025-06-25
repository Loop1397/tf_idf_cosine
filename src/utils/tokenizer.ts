import * as kuromoji from "@patdx/kuromoji";
import type { Token } from "../types/Token";

// kuromojiを使うためのclass
class Tokenizer {
    private kuromojiTokenizer: any;

    constructor() {}

    /**
     * 初期化に必要なメッソード(ex - TokenizerBuilder.build())が非同期処理を必要とするが、
     * constructor内では非同期の処理ができないため、
     * 初期化のためのinitメッソードを実装し、
     * 初期化をせずに他のメッソードを実行したらエラーが出るように作成する。
     */
    public init = async (): Promise<void> => {
        if (this.kuromojiTokenizer) return;

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

        this.kuromojiTokenizer = await new kuromoji.TokenizerBuilder({
            loader: myLoader,
        }).build();
    };

    /**
     * kuromojiによって形態素解析された結果からある品詞の単語を抽出するメッソード
     * 抽出される単語のdefault品詞は名詞になっているが、必要によって他の品詞に変えることもできる。
     */
    public extractIndexWord = (tokens: Token[], wordClass: string = "名詞"): string[] => {
        const indexWords = tokens
            .filter(token => token.pos === wordClass)
            .map(token => {
                return token.surface_form;
            });

        return indexWords;
    };

    /**
     * 文書からtokenを取り出すメッソード
     * まずkuromojiを使って形態素解析を行い、その後extractIndexWordを用いてtokenのみを抽出する
     */
    public tokenize = (text: string, wordClass: string = "名詞"): string[] => {
        if (!this.kuromojiTokenizer) {
            throw new Error("Tokenizerが初期化されていません。 先にinit()メッソードを実行してください。");
        }

        // 形態素解析
        const tokens: Token[] = this.kuromojiTokenizer.tokenize(text);
        // console.log(tokens);

        return this.extractIndexWord(tokens, wordClass);
    };
}

export default Tokenizer;
