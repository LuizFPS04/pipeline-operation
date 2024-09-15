import { InstructionMips } from "../types/mipsTypes";
import { instructionsList, registersOn } from "../utils/mipsMock";

export function applyBubble(instructions: string[]): string[] {
    console.log("Enter: ", instructions);

    const instructionOptimized: string[] = [];
    const instructionLength: number = instructions.length;

    for (let i = 0; i < instructionLength; i++) {
        let instructionFound: string = instructions[i];
        instructionFound = instructionFound.replace(/\(/g, " ")
            .replace(/\)/g, "")
            .replace(/,/g, "")
            .replace(/\s+/, " ");

        instructionOptimized.push(instructionFound);

        const instructionLine: string[] = instructionFound.split(/\s+/);
        const registers: string[] = instructionLine.slice(1);
        const mnemonic: string = instructionLine[0];

        const instructionMnemonic: InstructionMips | undefined = instructionsList[mnemonic];

        const format: string = instructionMnemonic ? instructionMnemonic['format'] : "N/A";
        const destiny: string = instructionMnemonic ? instructionMnemonic['destiny'] : "N/A";


        if (format != 'J' && destiny != 'S') {
            let futureInstruction: string = instructions[i + 1];
            let conflictFound: boolean = false;

            if (futureInstruction) {
                futureInstruction = futureInstruction.replace(/\(/g, " ")
                    .replace(/\)/g, "")
                    .replace(/,/g, "")
                    .replace(/\s+/, " ");

                const futureInstructionLine: string[] = futureInstruction.split(/\s+/);
                const futureRegisters: string[] = futureInstructionLine.slice(1);

                for (const register of registers) {
                    if (registersOn[register] && futureRegisters.includes(register)) {
                        console.log(`Conflict: ${register} in ${instructionFound} and ${futureInstruction}`);

                        instructionOptimized.push("NOP");
                        instructionOptimized.push("NOP");
                        conflictFound = true;
                        break;
                    }
                }
            }

            if (!conflictFound) {
                let futureInstructionJump: string = instructions[i + 2];

                if (futureInstructionJump) {
                    futureInstructionJump = futureInstructionJump
                        .replace(/\(/g, " ")
                        .replace(/\)/g, "")
                        .replace(/,/g, "")
                        .replace(/\s+/, " ");

                    const futureInstructionJumpLine: string[] = futureInstructionJump.split(/\s+/);
                    const futureRegistersJump: string[] = futureInstructionJumpLine.slice(1);

                    for (const register of registers) {
                        if (registersOn[register] && futureRegistersJump.includes(register)) {
                            console.log(`Conflict: ${register} in ${instructionFound} and ${futureInstructionJump}`);

                            instructionOptimized.push("NOP");
                            instructionOptimized.push("NOP");
                            break;
                        }
                    }
                }
            }
        }
    }

    console.log("Optimized: ", instructionOptimized);
    return instructionOptimized;
}