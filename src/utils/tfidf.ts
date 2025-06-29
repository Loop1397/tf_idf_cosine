class TfIdf {
    private idfArray: number[] = [];

    constructor() { }


    /**
     * 各文章やqueryのTFを求めるメッソド
     * 各単語が文章に含まれている数/各文章の総単語数
     */
    public calculateTf = (tokens: string[], vocabularys: string[]) => {
        const tfArray: number[] = new Array(vocabularys.length).fill(0);
        const totalOfWords = tokens.length;

        tokens.forEach(token => {
            const index = vocabularys.indexOf(token);
            if (index !== -1) {
                tfArray[index] += 1;
            }
        })

        tfArray.forEach((tf, index) => tfArray[index] = tf / totalOfWords);

        return tfArray;
    }

    /**
     * 各単語のIDFを求めるメッソド
     */
    public setIdf = (tokenArrays: string[][], vocabularys: string[]) => {
        const newIdf: number[] = new Array(vocabularys.length).fill(0);

        vocabularys.forEach((vocabulary, index) => {
            tokenArrays.forEach(tokenArray => {
                if (tokenArray.indexOf(vocabulary) !== -1) newIdf[index] += 1;
            })
        })

        newIdf.forEach((idf, index) => newIdf[index] = Math.log(tokenArrays.length / idf));

        this.idfArray = newIdf;
    }

    // TF-IDFを求めるメッソド
    public calculateTfIdf = () => {

    }
}

export default TfIdf;