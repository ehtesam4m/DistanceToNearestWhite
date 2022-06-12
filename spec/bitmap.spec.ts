import { Bitmap } from '../src/bitmap';

describe('Bitmap', () => {
    describe('create', () => {

        it('should return unsuccessful result with correct error message where data is empty', () => {
            const result = Bitmap.create([]);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`Bitmap data: array can not be empty`);
        });

        it('should return unsuccessful result with correct error message when number of columns are not consistent', () => {
            const result = Bitmap.create([[1, 0], [1]]);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`Bitmap column data: length does not match expected length of 2`);
        });

        it('should return unsuccessful result with correct error message when data contains element other than 0 or 1', () => {
            const result = Bitmap.create([[1, 2]]);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`Only 0 and 1 is allowed in bit map`);
        });

        it('should return unsuccessful result with correct error message when data does not contain any 1', () => {
            const result = Bitmap.create([[0, 0]]);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`Number of 1s should be at least 1`);
        });

        it('should create bitmap object when data is valid', () => {
            const result = Bitmap.create([[0, 1]]);
            expect(result.isSuccess).toBe(true);
            expect(result.value).toBeInstanceOf(Bitmap);
        });

        it('should have valid data in created object when data parameter is valid', () => {
            const result = Bitmap.create([[0, 1]]);
            expect(result.value.data).toEqual([[0, 1]]);
        });
    });

    describe('getDistanceToNearestWhite', () => {
        it('should return valid result when bitmap has only one element', () => {
            const bitmap = Bitmap.create([[1]]).value;
            expect(bitmap.getDistanceToNearestWhite()).toEqual([[0]]);
        });

        it('should return valid result when bitmap has only one row with multiple elements', () => {
            const bitmap = Bitmap.create([[1, 0, 1]]).value;
            expect(bitmap.getDistanceToNearestWhite()).toEqual([[0, 1, 0]]);
        });

        it('should return valid result when bitmap has multiple row with multiple elements', () => {
            const bitmap = Bitmap.create([[0, 0], [1, 1]]).value;
            expect(bitmap.getDistanceToNearestWhite()).toEqual([[1, 1], [0, 0]]);
        });
    });
});