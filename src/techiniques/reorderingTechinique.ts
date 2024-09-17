import { InstructionMips } from "../types/mipsTypes";
import { instructionsList, registersOn } from "../utils/mipsMock";
import { applyBubble } from "./bubbleTechinique";

export function applyReordering(instructions: string[]): string[] {
    console.log("Enter: ", instructions);
    let instructionOptimized: string[] = [];

    instructions = applyBubble(instructions);

    const instructionLength: number = instructions.length;

    for (let i = 0; i < instructionLength; i++) {
        const instructionFound: string = instructions[i];
        const instructionFoundProcess = instructionFound.replace(/\(/g, " ")
            .replace(/\)/g, "")
            .replace(/,/g, "")
            .replace(/\s+/, " ")
            .toLowerCase();

        if (instructionFoundProcess != "nop") {
            const isDependance: boolean = hasDependance(i, instructions);
            if (!isDependance) {
                for (let j = 0; j < instructionLength; j++) {
                    const instructionJump: string = instructions[j];
                    if (instructionJump && instructionJump.toLowerCase() == "nop") {
                        const isConflict: boolean = hasConflict(j, i, instructions);
                        if (!isConflict) {
                            instructions[j] = instructionFound;
                            instructions.slice(i, 1);
                            break;
                        }
                    }
                }
            }

        };
    }

    for (let instruction of instructions) {
        const instructionLine: string[] = instruction.split(/\s+/);
        const mnemonic: string = instructionLine[0];

        const instructionMnemonic: InstructionMips | undefined = instructionsList[mnemonic];

        const format: string = instructionMnemonic ? instructionMnemonic['format'] : "N/A";

        if (
            mnemonic === 'beq'  || mnemonic === 'bne' ||
            mnemonic === 'bgez' || mnemonic === 'bgezal' ||
            mnemonic === 'bgtz' || mnemonic === 'blez' ||
            mnemonic === 'bltz' || mnemonic === 'bltzal' ||
            format === 'J'
        ) {
            instructionOptimized.unshift(instruction);
        } else {
            if (!instructionOptimized.includes(instruction)) {
                instructionOptimized.push(instruction);
            }
        }
    }

    instructionOptimized = instructionOptimized.filter(inst => inst.trim() !== "NOP");

    console.log("Optimized: ", instructionOptimized);
    return instructionOptimized;
}

function hasDependance(index: number, instructions: string[]): boolean {

    const mainInstruction: string = instructions[index];
    const instructionLength: number = instructions.length;

    const instructionMainProcess = mainInstruction.replace(/\(/g, " ")
        .replace(/\)/g, "")
        .replace(/,/g, "")
        .replace(/\s+/, " ")
        .toLowerCase();


    const instructionLine: string[] = instructionMainProcess.split(/\s+/);
    const registers: string[] = instructionLine.slice(1);

    const start: number = Math.max(0, index - 15);
    const end: number = Math.min(instructionLength - 1, index + 15);

    for (let i = start; i <= end; i++) {
        if (i == index) continue;

        const instructionFuture: string = instructions[i];
        const instructionFutureProcess = instructionFuture.replace(/\(/g, " ")
            .replace(/\)/g, "")
            .replace(/,/g, "")
            .replace(/\s+/, " ")
            .toLowerCase();


        const instructionFutureLine: string[] = instructionFutureProcess.split(/\s+/);
        const registersFuture: string[] = instructionFutureLine.slice(1);

        if (instructionFuture) {
            if (i < index) {
                for (const register of registers) {
                    if (registersOn[register] && registersFuture.includes(register)) {
                        return true;
                    }
                }
            } else {
                for (const register of registers) {
                    if (registersOn[register] && registersFuture.includes(register)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function hasConflict(index: number, lastIndex: number, instructions: string[]): boolean {

    const mainInstruction: string = instructions[lastIndex];
    const instructionLength: number = instructions.length;

    const instructionMainProcess = mainInstruction.replace(/\(/g, " ")
        .replace(/\)/g, "")
        .replace(/,/g, "")
        .replace(/\s+/, " ")
        .toLowerCase();


    const instructionLine: string[] = instructionMainProcess.split(/\s+/);
    const registers: string[] = instructionLine.slice(1);

    const start: number = Math.max(0, index - 2);
    const end: number = Math.min(instructionLength - 1, index + 2);

    for (let i = start; i <= end; i++) {
        if (i == index) continue;

        const instructionFuture: string = instructions[i];
        const instructionFutureProcess = instructionFuture.replace(/\(/g, " ")
            .replace(/\)/g, "")
            .replace(/,/g, "")
            .replace(/\s+/, " ")
            .toLowerCase();


        const instructionFutureLine: string[] = instructionFutureProcess.split(/\s+/);
        const registersFuture: string[] = instructionFutureLine.slice(1);

        if (instructionFuture) {
            if (i < lastIndex) {
                for (const register of registers) {
                    if (registersOn[register] && registersFuture.includes(register)) {
                        return true;
                    }
                }
            } else {
                for (const register of registers) {
                    if (registersOn[register] && registersFuture.includes(register)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}