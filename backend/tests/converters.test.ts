import { describe, test, expect } from '@jest/globals';
import { fromModelToUser } from '../src/utils/converters'; 
import { UserModel } from '../src/types/ddbbModel';
import { ObjectId } from 'mongodb';
import { User } from '../src/types/types';


describe('Unit test: testing converters functions', () => {

    test('Testing User converter function', () => {

        const UserModelTest: UserModel = {
            _id: new ObjectId,
            name: "Manuel",
            surname: "García",
            email: "manuel@gmail.com",
            password: "1234",
            birthDate: new Date(),
            diabetesType: "tipo1",
            registerDate: new Date()
        }

        const UserTest: User = {
            id: UserModelTest._id!.toString(),
            name: "Manuel",
            surname: "García",
            email: "manuel@gmail.com",
            birthDate: new Date(),
            diabetesType: "tipo1",
            registerDate: new Date()
        }

        const result = fromModelToUser(UserModelTest);

        expect(result).toStrictEqual(UserTest);

    });

});