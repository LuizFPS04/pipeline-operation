export type TRegisters = Record<string, boolean>;

export interface InstructionMips {
    format: 'R' | 'I' | 'J',
    destiny: 'D' | 'S',
    advance: boolean
}


export type RegisterKeys = keyof TRegisters;