import { InstructionMips, TRegisters } from '../types/mipsTypes';

export const instructionsList: { [key: string]: InstructionMips } = {
    add: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    addi: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    addiu: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    addu: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    and: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    andi: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    beq: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    bgez: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    bgezal: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    bgtz: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    blez: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    bltz: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    bltzal: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    bne: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    break: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    div: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    divu: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    eret: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    j: {
        format: 'J',
        destiny: 'S',
        advance: true
    },
    jal: {
        format: 'J',
        destiny: 'S',
        advance: true
    },
    jalr: {
        format: 'R',
        destiny: 'D',
        advance: true
    },
    jr: {
        format: 'R',
        destiny: 'S',
        advance: true
    },
    lb: {
        format: 'I',
        destiny: 'D',
        advance: true
    },
    lbu: {
        format: 'I',
        destiny: 'D',
        advance: true
    },
    lh: {
        format: 'I',
        destiny: 'D',
        advance: true
    },
    lhu: {
        format: 'I',
        destiny: 'D',
        advance: true
    },
    lui: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    lw: {
        format: 'I',
        destiny: 'D',
        advance: true
    },
    lwl: {
        format: 'I',
        destiny: 'D',
        advance: true
    },
    lwr: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    mfco: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    mfhi: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    mflo: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    mtco: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    mthi: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    mtlo: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    mul: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    mult: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    multu: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    nor: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    or: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    ori: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    sb: {
        format: 'I',
        destiny: 'S',
        advance: true
    },
    sh: {
        format: 'I',
        destiny: 'S',
        advance: true
    },
    sll: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    sllv: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    slt: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    slti: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    sltu: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    sra: {
        format: 'R',
        destiny: 'D',
        advance: true
    },
    srav: {
        format: 'R',
        destiny: 'D',
        advance: true
    },
    srl: {
        format: 'R',
        destiny: 'D',
        advance: true
    },
    srlv: {
        format: 'R',
        destiny: 'D',
        advance: true
    },
    srllv: {
        format: 'R',
        destiny: 'D',
        advance: true
    },
    stliu: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
    sub: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    subu: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    sw: {
        format: 'I',
        destiny: 'S',
        advance: true
    },
    swl: {
        format: 'I',
        destiny: 'S',
        advance: true
    },
    swr: {
        format: 'I',
        destiny: 'S',
        advance: false
    },
    teq: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    tge: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    tgeu: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    tlt: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    tltu: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    tne: {
        format: 'R',
        destiny: 'S',
        advance: false
    },
    xor: {
        format: 'R',
        destiny: 'D',
        advance: false
    },
    xori: {
        format: 'I',
        destiny: 'D',
        advance: false
    },
};

export const registersOn: TRegisters = {
    '$zero': true,
    '$at': true,
    '$v0': true,
    '$v1': true,
    '$a0': true,
    '$a1': true,
    '$a2': true,
    '$a3': true,
    '$t0': true,
    '$t1': true,
    '$t2': true,
    '$t3': true,
    '$t4': true,
    '$t5': true,
    '$t6': true,
    '$t7': true,
    '$s0': true,
    '$s1': true,
    '$s2': true,
    '$s3': true,
    '$s4': true,
    '$s5': true,
    '$s6': true,
    '$s7': true,
    '$t8': true,
    '$t9': true,
    '$k0': true,
    '$k1': true,
    '$gp': true,
    '$sp': true,
    '$s8': true,
    '$ra': true
}