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
     */
    private setIdf = (tokenArrays: string[][]) => {
        const newIdf: number[] = new Array(this.vocabularys.length).fill(0);

        this.vocabularys.forEach((vocabulary, index) => {
            tokenArrays.forEach(tokenArray => {
                if (tokenArray.indexOf(vocabulary) !== -1) newIdf[index] += 1;
            })
        })

        newIdf.forEach((idf, index) => newIdf[index] = Math.log(tokenArrays.length / idf));

        this.idfArray = newIdf;
    }

    /**
     * 各文章やqueryのTFを求めるメッソド
     * 各単語が文章に含まれている数/各文章の総単語数
     */
    public calculateTf = (tokens: string[]): number[] => {
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
    public calculateTfIdf = () => {

    }
}

export default TfIdf;