import { describe, test, expect } from '@jest/globals';
import { Therapy, GlucoseRegister } from "../src/types/types";
import { calculateStats } from "../src/utils/statsFunctions";


const TherapyForTesting: Therapy = {
    id: "69c2f6de9b8970654ee0cb55",
    userId: "699c9b32d5e6e90cb3b09cf1",
    ratios: [
        {period: "desayuno", ratio: 1.5, sensibilityFactor: 50},
        {period: "comida", ratio: 1, sensibilityFactor: 50},
        {period: "merienda", ratio: 1, sensibilityFactor: 50},
        {period: "cena", ratio: 1.5, sensibilityFactor: 50},
    ],
    glucoseTarget: 110,
    insulinActive: 3,
    glucoseLimits: {inRangeLimit: 180, lowLimit: 70, highLimit: 250, veryHighLimit: 400}
};

const GlucoseRegisters: GlucoseRegister[] = [
    { id: "1", userId: "1", glucoseValue: 65, date_hour: new Date(), registerMethod: "manual" },  
    { id: "2", userId: "1", glucoseValue: 113, date_hour: new Date(), registerMethod: "manual" }, 
    { id: "3", userId: "1", glucoseValue: 240, date_hour: new Date(), registerMethod: "manual" }, 
    { id: "4", userId: "1", glucoseValue: 290, date_hour: new Date(), registerMethod: "manual" }
];

const GlucoseRegisters2: GlucoseRegister[] = [
    { id: "1", userId: "1", glucoseValue: 65, date_hour: new Date(), registerMethod: "manual" },  
    { id: "2", userId: "1", glucoseValue: 113, date_hour: new Date(), registerMethod: "manual" }, 
    { id: "2", userId: "1", glucoseValue: 113, date_hour: new Date(), registerMethod: "manual" }
];

const GlucoseRegistersEmpty: GlucoseRegister[] = [];

describe('Unit Tests: testing TIR (time in range) calculation function', () => {

    test('testing TIR percentages', () => {

        const result = calculateStats(GlucoseRegisters, TherapyForTesting);

        expect(result.low).toBe(25);
        expect(result.inRange).toBe(25);
        expect(result.high).toBe(25);
        expect(result.veryHigh).toBe(25);
    });

    test('Testing mathematics percentages rounds management', () => {

        const result = calculateStats(GlucoseRegisters2, TherapyForTesting);

        expect(result.low).toBe(33);
        expect(result.inRange).toBe(67);
        expect(result.high).toBe(0);
        expect(result.veryHigh).toBe(0);

    });

    test('Testing error management: Return 0 if glucose regsiters are empty', () => {

        const result = calculateStats(GlucoseRegistersEmpty, TherapyForTesting);

        expect(result.low).toBe(0);
        expect(result.inRange).toBe(0);
        expect(result.high).toBe(0);
        expect(result.veryHigh).toBe(0);

    });

});
