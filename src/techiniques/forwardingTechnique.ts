import { InstructionMips } from "../types/mipsTypes";
import { instructionsList, registersOn } from "../utils/mipsMock";

export function applyForwading(instructions: string[]): string[] {
    console.log("Enter: ", instructions);

    const instructionOptimized: string[] = [];
    const instructionLength: number = instructions.length;

    for (let i = 0; i < instructionLength; i++) {
        const instructionFound: string = instructions[i];
        const instructionFoundProcess = instructionFound.replace(/\(/g, " ")
            .replace(/\)/g, "")
            .replace(/,/g, "")
            .replace(/\s+/, " ")
            .toLowerCase();

        instructionOptimized.push(instructionFound);

        const instructionLine: string[] = instructionFoundProcess.split(/\s+/);
        const registers: string[] = instructionLine.slice(1);
        const mnemonic: string = instructionLine[0];

        const instructionMnemonic: InstructionMips | undefined = instructionsList[mnemonic];

        const advance: boolean = instructionMnemonic ? instructionMnemonic['advance'] : false;

        if (advance) {
            let conflictFound: boolean = false;
            const futureInstruction: string = instructions[i + 1];

            if (futureInstruction) {
                const futureInstructionProcess = futureInstruction.replace(/\(/g, " ")
                    .replace(/\)/g, "")
                    .replace(/,/g, "")
                    .replace(/\s+/, " ")
                    .toLowerCase();

                const futureInstructionLine: string[] = futureInstructionProcess.split(/\s+/);
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
                const futureInstructionJump: string = instructions[i + 2];

                if (futureInstructionJump) {
                    const futureInstructionJumpProcess = futureInstructionJump
                        .replace(/\(/g, " ")
                        .replace(/\)/g, "")
                        .replace(/,/g, "")
                        .replace(/\s+/, " ")
                        .toLowerCase();

                    const futureInstructionJumpLine: string[] = futureInstructionJumpProcess.split(/\s+/);
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