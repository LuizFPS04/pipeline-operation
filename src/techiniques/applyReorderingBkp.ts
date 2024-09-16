import { InstructionMips } from "../types/mipsTypes";
import { instructionsList, registersOn } from "../utils/mipsMock";
import { applyBubble } from "./bubbleTechinique";

export function applyReorderingBkp(instructions: string[]): string[] {
    console.log("Enter: ", instructions);
    let instructionOptimized: string[] = [];
    let useBubble: boolean = false;

    if (!instructions.includes("NOP") && !instructions.includes("nop")) {
        instructions = applyBubble(instructions);
        useBubble = true;
    }

    const instructionLength: number = instructions.length;

    for (let i = 0; i < instructionLength; i++) {

        console.log("Initial Index: ", i);

        const instructionFound: string = instructions[i];
        const instructionFoundProcess = instructionFound.replace(/\(/g, " ")
            .replace(/\)/g, "")
            .replace(/,/g, "")
            .replace(/\s+/, " ")
            .toLowerCase();

        if (instructionFoundProcess == "nop") continue;

        const instructionLine: string[] = instructionFoundProcess.split(/\s+/);
        const registers: string[] = instructionLine.slice(1);
        const mnemonic: string = instructionLine[0];

        const instructionMnemonic: InstructionMips | undefined = instructionsList[mnemonic];

        const format: string = instructionMnemonic ? instructionMnemonic['format'] : "N/A";

        if (mnemonic === 'beq' || mnemonic === 'bne' || format === 'J') {
            instructionOptimized.unshift(instructionFound);
        } else {
            let hasDependance: boolean = false;
            let conflictFound: boolean = false;

            let futureInstruction: string = instructions[i + 1];

            if (futureInstruction) {

                let index: number = i + 1;
                while (futureInstruction.toLowerCase() == "nop") {
                    futureInstruction = instructions[index];
                    index++;
                }

                console.log("Future: ", futureInstruction);
                const futureInstructionProcess = futureInstruction.replace(/\(/g, " ")
                    .replace(/\)/g, "")
                    .replace(/,/g, "")
                    .replace(/\s+/, " ")
                    .toLowerCase();

                if (futureInstructionProcess != "nop") {
                    const futureInstructionLine: string[] = futureInstructionProcess.split(/\s+/);
                    const futureRegisters: string[] = futureInstructionLine.slice(1);

                    for (const register of registers) {
                        if (registersOn[register] && futureRegisters.includes(register)) {
                            console.log(`Dependance: ${register} in ${instructionFound} and ${futureInstruction}`);
                            hasDependance = true;
                            break;
                        }
                    }

                    if (hasDependance && useBubble) {
                        if (!instructionOptimized.includes(instructionFound) && !instructionOptimized.includes(instructions[instructionLength - 1])) {
                            instructionOptimized.push(instructionFound);
                            instructionOptimized.push(instructions[instructionLength - 1])
                        }
                    }

                    if (!hasDependance) {
                        let futureInstructionJump: string = instructions[i + 2];

                        if (futureInstructionJump) {
                            let index: number = i + 2;
                            while (futureInstructionJump && futureInstructionJump.toLowerCase() === "nop") {
                                index += 2;
                                futureInstructionJump = instructions[index];
                            }
                            if (futureInstructionJump) {
                                const futureInstructionJumpProcess = futureInstructionJump
                                    .replace(/\(/g, " ")
                                    .replace(/\)/g, "")
                                    .replace(/,/g, "")
                                    .replace(/\s+/, " ")
                                    .toLowerCase();

                                if (futureInstructionJumpProcess != "nop") {
                                    const futureInstructionJumpLine: string[] = futureInstructionJumpProcess.split(/\s+/);
                                    const futureRegistersJump: string[] = futureInstructionJumpLine.slice(1);

                                    for (const register of registers) {
                                        if (registersOn[register] && futureRegistersJump.includes(register)) {
                                            console.log(`Dependance: ${register} in ${instructionFound} and ${futureInstructionJump}`);
                                            instructionOptimized.push(futureInstruction);
                                            instructionOptimized.push(instructionFound);
                                            conflictFound = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (!conflictFound && !instructionOptimized.includes(instructionFound)) {
                instructionOptimized.push(instructionFound);
            }

            instructionOptimized = instructionOptimized.filter(inst => inst.trim() !== "nop");
        }
    }

    console.log("Optimized: ", instructionOptimized);
    return instructionOptimized;
}