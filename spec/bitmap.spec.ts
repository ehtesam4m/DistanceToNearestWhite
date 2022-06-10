import "jasmine";
import { Bitmap } from "../src/bitmap";

describe("Bitmap", () => {
    describe("create", () => {
     
        it('should return error when number of data is empty', () => {
            expect(()=> Bitmap.create([])).toThrowError('Bitmap data can not be empty');
        });
    });
    
});