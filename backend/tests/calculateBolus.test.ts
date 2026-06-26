import { describe, test, expect } from '@jest/globals';
import { Therapy } from "../src/types/types";
import { calculateBolus } from "../src/utils/calculateBolus"; 

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
}

describe('Unit test: testing insulin bolus calculator function', () => {

    test('Testing estandar bolus calculation', () => {

        //Arrange
        const grams = 45;
        const glucoseValue = 102;

        //Act
        const result = calculateBolus(grams, glucoseValue, "desayuno", TherapyForTesting);

        //Assert
        expect(result).toBe(7);
    });

    test('Testing correction bolus calculation', () => {

        const grams = 45;
        const glucoseValue = 150;

        const result = calculateBolus(grams, glucoseValue, "desayuno", TherapyForTesting);
        expect(result).toBe(7.5);
    });

    test('Testing if period is invalid', () => {

        const grams = 45;
        const glucoseValue = 150;

        expect(() => {
            calculateBolus(grams, glucoseValue, "almuerzo", TherapyForTesting);
        }).toThrow("No ratio defined for period: almuerzo");
    });

});