import { Bitmap } from '../src/bitmap';

/*describe('Bitmap', () => {
    describe('create', () => {

        it('should throw error when data is empty', () => {
            expect(() => Bitmap.create([])).toThrowError('Bitmap data can not be empty');
        });

        it('should throw error when number of columns are not consistent', () => {
            expect(() => Bitmap.create([[1, 0], [1]])).toThrowError('All rows should contain same number of col');
        });

        it('should throw error when data contains element other than 0 or 1', () => {
            expect(() => Bitmap.create([[1, 2]])).toThrowError('Only 0 and 1 is allowed in bit map');
        });

        it('should throw error when data does not contain any 1', () => {
            expect(() => Bitmap.create([[0, 0]])).toThrowError('Number of 1s should be at least 1');
        });

        it('should create bitmap object when data is valid', () => {
            const bitmap = Bitmap.create([[0, 1]]);
            expect(bitmap).toBeInstanceOf(Bitmap);
        });

        it('should have valid data in created object when data parameter is valid', () => {
            const bitmap = Bitmap.create([[0, 1]]);
            expect(bitmap.data).toEqual([[0, 1]]);
        });
    });

    describe('getDistanceToNearestWhite', () => {
        it('should return valid result when bitmap has only one element', () => {
            const bitmap = Bitmap.create([[1]]);
            expect(bitmap.getDistanceToNearestWhite()).toEqual([[0]]);
        });

        it('should return valid result when bitmap has only one row with multiple elements', () => {
            const bitmap = Bitmap.create([[1, 0, 1]]);
            expect(bitmap.getDistanceToNearestWhite()).toEqual([[0, 1, 0]]);
        });

        it('should return valid result when bitmap has multiple row with multiple elements', () => {
            const bitmap = Bitmap.create([[0, 0], [1, 1]]);
            expect(bitmap.getDistanceToNearestWhite()).toEqual([[1, 1], [0, 0]]);
        });
    });
});*/