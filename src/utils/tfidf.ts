class TfIdf {
    // 各文章やqueryのTFを求めるメッソド
    public calculateTf = (tokens: string[], vocabularys: string[]) => {
        const tfArray: number[] = new Array(vocabularys.length).fill(0);
        const totalOfWords = tokens.length;

        console.log(tokens);

        tokens.forEach(token => {
            const index = vocabularys.indexOf(token);
            if (index !== -1) {
                tfArray[index] += 1;
            }
        })

        tfArray.forEach((tf, index) => tfArray[index] = tf / totalOfWords);

        return tfArray;
    }

    // 各単語のIDFを求めるメッソド
    public calculateIdf = () => {

    }

    // TF-IDFを求めるメッソド
    public calculateTfIdf = () => {

    }
}

export default TfIdf;