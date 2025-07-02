class Similarity {
    constructor() { }

    // ベクトルのノルムを求めるメッソド
    private calculateNorm = (vector: number[]) => {
        const result = vector.reduce((acc, cur) => acc + (cur ** 2), 0)
        return Math.sqrt(result);
    }

    // ベクトルの内積を求めるメッソド
    private calculateDotProduct = (vector1: number[], vector2: number[]) => {
        return vector1.reduce((acc, cur, index) => acc + (cur * vector2[index]), 0);
    }

    // 二つのベクトルのコサイン類似度を求めるメッソド
    public calculateCosineSimilarity = (vector1: number[], vector2: number[]) => {
        // vector1とvector2の次元が違うときのエラー
        if (vector1.length !== vector2.length) {
            throw new Error('vector1とvector2の長さが違います！');
        }
        // vectorの中身がないときのエラー
        else if (vector1.length === 0) {
            throw new Error('空のベクトルが入っています！');
        }

        return this.calculateDotProduct(vector1, vector2) / (this.calculateNorm(vector1) * this.calculateNorm(vector2))
    }
}

export default Similarity;