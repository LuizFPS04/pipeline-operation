import { InstructionMips } from "../types/mipsTypes";
import { instructionsList, registersOn } from "../utils/mipsMock";

export function applyForwading(instructions: string[]): string[] {
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

        const advance: boolean = instructionMnemonic ? instructionMnemonic['advance'] : false;

        if (advance) {
            let conflictFound: boolean = false;
            let futureInstruction: string = instructions[i + 1];

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