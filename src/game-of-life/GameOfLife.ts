import {CellularAutomata, Kernel} from "./CellularAutomata";

export class GameOfLife {
    private cellularAutomata: CellularAutomata;
    constructor(private size: [number, number]) {
        this.cellularAutomata = new CellularAutomata(
            size,
            [3, 3]
        )
    }

    placePattern(x: number, y: number, pattern: string) {
        const arrayPattern = pattern.trim()
            .split('\n')
            .map(it => it.trim().split('').map(it => parseInt(it)));

        for (let i = 0; i < arrayPattern.length; i++) {
            for (let j = 0; j < arrayPattern[i].length; j++) {
                this.cellularAutomata.set(x + i, y + j, arrayPattern[i][j])
            }
        }
    }

    update(): string {
        this.cellularAutomata.update(this.gameOfLifeRule);
        return this.cellularAutomata.toString();
    }

    toString(): string {
        return this.cellularAutomata.toString();
    }

    private gameOfLifeRule(kernel: Kernel): number {
        const kernelSum = kernel.reduction(0, (acc, value) => acc + value);
        const neighbours = kernelSum - kernel.center();
        if (neighbours < 2 || neighbours > 3) {
            return 0;
        } else if (neighbours === 3) {
            return 1;
        } else if (neighbours === 2) {
            return kernel.center();
        }
    }
}