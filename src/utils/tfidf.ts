class TfIdf {
    private idfArray: number[] = [];
    private vocabularys: string[] = [];

    constructor() { }

    public init = (tokenArrays: string[][]) => {
        this.setVocabulary(tokenArrays);
        this.setIdf(tokenArrays);
    }

    /**
     * 文章で登場した全ての単語をvocabularysに記入
     */
    private setVocabulary = (tokenArrays: string[][]) => {
        const vocabularySet = new Set(tokenArrays.flat());
        this.vocabularys = [...vocabularySet];
    }

    /**
     * 各単語のIDFを求めるメッソド
     * IDF(d,t) = ln(D / df(t)) + 1で計算
     */
    private setIdf = (tokenArrays: string[][]) => {
        const newIdf: number[] = new Array(this.vocabularys.length).fill(0);

        this.vocabularys.forEach((vocabulary, index) => {
            tokenArrays.forEach(tokenArray => {
                if (tokenArray.indexOf(vocabulary) !== -1) newIdf[index] += 1;
            })
        })

        newIdf.forEach((idf, index) => newIdf[index] = Math.log(tokenArrays.length / idf) + 1);

        this.idfArray = newIdf;
    }

    /**
     * 各文章やqueryのTFを求めるメッソド
     * 各単語が文章に含まれている数/各文章の総単語数
     */
    private calculateTf = (tokens: string[]): number[] => {
        const tfArray: number[] = new Array(this.vocabularys.length).fill(0);
        const totalOfWords = tokens.length;

        tokens.forEach(token => {
            const index = this.vocabularys.indexOf(token);
            if (index !== -1) {
                tfArray[index] += 1;
            }
        })

        tfArray.forEach((tf, index) => tfArray[index] = tf / totalOfWords);

        return tfArray;
    }


    // TF-IDFを求めるメッソド
    public calculateTfIdf = (tokens: string[]) => {
        if (this.idfArray.length === 0 || this.vocabularys.length === 0) {
            throw new Error("idfもしくはvocabularyが初期化されていません。 先にinit()メッソードを実行してください。");
        }

        if (this.vocabularys.filter(vocabulary => new Set(tokens).has(vocabulary)).length === 0) {
            throw new Error("一致する文書がありません！");
        }


        return this.calculateTf(tokens).map((tf, index) => tf * this.idfArray[index]);
    }
}

export default TfIdf;