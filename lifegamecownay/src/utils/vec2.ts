interface IntVec {
    values: number[];
    sum: (t: IntVec) => IntVec;
    mult: (t: number) => IntVec;
}

class Vec implements IntVec {
    values: number[];

    constructor(...args: number[]) {
        this.values = [...args];
    }

    sum(t: IntVec): IntVec {
        const res = this.values.map((v, i) => v + (t.values[i] ?? 0));
        return new Vec(...res);
    }

    mult(t: number): IntVec {
        const res = this.values.map(v => v * t);
        return new Vec(...res);
    }
}

const vec = (...args: number[]): IntVec => {
    return new Vec(...args);
};

export default vec;