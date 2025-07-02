class Similarity {
    constructor() { }

    private calculateNorm = (vector: number[]) => {
        const result = vector.reduce((acc, current) => acc + (current ** 2), 0)
        return Math.sqrt(result);
    }

    public calculateCosineSimilarity = (vector1: number[]) => {
        console.log(this.calculateNorm(vector1));
    }
}

export default Similarity;