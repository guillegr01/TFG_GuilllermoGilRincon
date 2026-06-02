import { describe, test, expect } from '@jest/globals';
import { fromModelToCarbohydrateIntake, fromModelToGlucoseRegister, fromModelToTherapy, fromModelToUser } from '../src/utils/converters'; 
import { CarbohydrateIntakeModel, GlucoseRegisterModel, TherapyModel, UserModel } from '../src/types/ddbbModel';
import { ObjectId } from 'mongodb';
import { CarbohydrateIntake, GlucoseLimits, GlucoseRegister, InsulinRatio, Therapy, User } from '../src/types/types';


describe('Unit test: testing converters functions', () => {

    test('Testing User converter function', () => {

        //Arrange
        const birthDate_var = new Date();
        const registerDate_var = new Date();

        const UserModelTest: UserModel = {
            _id: new ObjectId,
            name: "Manuel",
            surname: "García",
            email: "manuel@gmail.com",
            password: "1234",
            birthDate: birthDate_var,
            diabetesType: "tipo1",
            registerDate: registerDate_var
        }

        const UserTest: User = {
            id: UserModelTest._id!.toString(),
            name: "Manuel",
            surname: "García",
            email: "manuel@gmail.com",
            birthDate: birthDate_var,
            diabetesType: "tipo1",
            registerDate: registerDate_var
        }

        //Act
        const result = fromModelToUser(UserModelTest);

        //Assert
        expect(result).toStrictEqual(UserTest);

    });

    test('Testing GlucoseRegister converter function', () => {

        //Arrange
        const date_hour_var = new Date();

        const GlucoseRegisterModelTest: GlucoseRegisterModel = {
            _id: new ObjectId,
            userId: "1",
            glucoseValue: 120,
            date_hour: date_hour_var,
            registerMethod: "manual"
        }

        const GlucoseRegisterTest: GlucoseRegister = {
            id: GlucoseRegisterModelTest._id!.toString(),
            userId: "1",
            glucoseValue: 120,
            date_hour: date_hour_var,
            registerMethod: "manual"
        }

        //Act
        const result = fromModelToGlucoseRegister(GlucoseRegisterModelTest);

        //Assert
        expect(result).toStrictEqual(GlucoseRegisterTest);

    });

    test('Testing Meals converter function', () => {

        //Arrange
        const date_hour_var = new Date();

        const MealModelTest: CarbohydrateIntakeModel = {
            _id: new ObjectId,
            userId: "1",
            grams: 40,
            glucoseValue: 120,
            period: "desayuno",
            date_hour: date_hour_var,
            totalBolus: 9.5
        }

        const MealsTest: CarbohydrateIntake = {
            id: MealModelTest._id!.toString(),
            userId: "1",
            grams: 40,
            glucoseValue: 120,
            period: "desayuno",
            date_hour: date_hour_var,
            description: undefined,
            foodImages: undefined,
            totalBolus: 9.5
        }

        //Act
        const result = fromModelToCarbohydrateIntake(MealModelTest);

        //Assert
        expect(result).toStrictEqual(MealsTest);

    });

    test('Testing therapy converter function', () => {

        //Arrange
        const ratios: InsulinRatio[] = [
            {period:"desayuno", ratio:1.5, sensibilityFactor:50},
            {period:"comida", ratio:1, sensibilityFactor:50},
            {period:"cena", ratio:1.5, sensibilityFactor:50},
        ];

        const limits: GlucoseLimits = {lowLimit:70, inRangeLimit:180, highLimit:250, veryHighLimit:400};

        const TherapyModelTest: TherapyModel = {
            _id: new ObjectId,
            userId: "1",
            ratios: ratios,
            glucoseTarget: 110,
            insulinActive: 3,
            glucoseLimits: limits
        }

        const TherapyTest: Therapy = {
            id: TherapyModelTest._id!.toString(),
            userId:"1",
            ratios: ratios,
            glucoseTarget: 110,
            insulinActive: 3,
            glucoseLimits: limits
        }

        //Act
        const result = fromModelToTherapy(TherapyModelTest);

        //Assert
        expect(result).toStrictEqual(TherapyTest);

    });

});