export class CellularAutomata {
    private kernel: Kernel;
    private grid: number[][];
    private altGrid: number[][];
    constructor(
        private size: [number, number],
        private kernelSize: [number, number],
    ) {

        if (kernelSize[0] % 2 === 0 || kernelSize[1] % 2 === 0) {
            throw new Error('KernelSize must be odd');
        }

        this.kernel = new Kernel(
            kernelSize,
            this
        );
        this.grid = new Array(size[0])
            .fill(0)
            .map(() => new Array(size[1]).fill(0));
        this.altGrid = new Array(size[0])
            .fill(0)
            .map(() => new Array(size[1]).fill(0));
    }

    update(rule: (kernel: Kernel) => number) {
        for (let i = 0; i < this.size[0]; i++) {
            for (let j = 0; j < this.size[1]; j++) {
                this.kernel.updatePosition(i, j);
                this.altGrid[i][j] = rule(this.kernel);
            }
        }

        // Swap
        const grid = this.grid;
        this.grid = this.altGrid;
        this.altGrid = grid;
    }

    get(x: number, y: number): number {
        return this.grid[(y + this.size[1]) % this.size[1]][(x + this.size[0]) % this.size[0]];
    }

    set(x: number, y: number, value: number) {
        this.grid[(y + this.size[1]) % this.size[1]][(x + this.size[0]) % this.size[0]] = value;
    }

    toString(): string {
        return this.grid
            .map(it => it.join(''))
            .join('\n');
    }
}

export class Kernel {
    private positionX: number = 0;
    private positionY: number = 0;
    private kernelSize: number;
    private kernelOffsets: [number[], number[]];

    constructor(
        private size: [number, number],
        private cellularAutomata: CellularAutomata,
    ) {
        this.kernelSize = size[0] * size[1];
        this.kernelOffsets = [
            new Array(size[0]).fill(0).map((_, idx) => idx - ((size[0] - 1) / 2)),
            new Array(size[1]).fill(0).map((_, idx) => idx - ((size[1] - 1) / 2)),
        ];
    }

    updatePosition(x: number, y: number) {
        this.positionX = x;
        this.positionY = y;
    }

    dimension(): [number, number] {
        return this.size;
    }

    position(): [number, number] {
        return [this.positionX, this.positionY];
    }

    values(): number[] {
        return this.reduction<number[]>(
            new Array<number>(this.kernelSize),
            (acc, value, idx) => {
                acc[idx] = value;
                return acc;
            }
        );
    }

    center(): number {
        return this.cellularAutomata.get(
            this.positionX,
            this.positionY,
        )
    }

    reduction<T>(initialValue: T, fn: (acc: T, value: number, idx: number) => T): T {
        let acc = initialValue;
        let idx = 0;
        for (const yOffset of this.kernelOffsets[1]) {
            for (const xOffset of this.kernelOffsets[0]) {
                acc = fn(
                    acc,
                    this.cellularAutomata.get(
                        this.positionX + xOffset,
                        this.positionY + yOffset,
                    ),
                    idx++
                )
            }
        }
        return acc;
    }
}