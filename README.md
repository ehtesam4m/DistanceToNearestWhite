# Problem Statement
This application<br />
● reads the description of the bitmap from the standard input;<br />
● for each pixel, computes the distance to the nearest white;<br />
● writes the results to the standard output.<br /><br />
**Input**<br />
The number of test cases t (1≤t≤1000) is in the first line of input, then t test cases follow
separated by an empty line. In the first line of each test case there is a pair of integer numbers
n, m separated by a single space, 1<=n <=182, 1<=m<=182. In each of the following n lines of
the test case exactly one zero-one word of length m, the description of one line of the bitmap, is
written. On the j-th position in the line (i+1), 1 <= i <= n, 1 <= j <= m, is '1' if, and only if the pixel
(i,j) is white.<br /><br />
**Output**<br />
In the i-th line for each test case, 1<=i<=n, there should be written m integers f(i,1),...,f(i,m)
separated by single spaces, where f(i,j) is the distance from the pixel (i,j) to the nearest white
pixel. Example:<br /><br />
Input:<br />
1<br />
3 4<br />
0001<br />
0011<br />
0110<br />
Output<br />
3 2 1 0<br />
2 1 0 0<br />
1 0 0 1<br />
# Distance Calculation Approach

The minimum distance of a cell from it's nearest white (1) can be computed from looking at all it's neighbours. In this case we need to take the minimum distance to nearest white from all it's neighbours and add one. Dynamic programming is used to calculate the distance. Here are the steps:

- A 2D result array is initalized with each cell populated by a large value (for example number rows + number of columns). The number of rows and columns should be same as the bitmap array.
- For each cell in the bitmap array we need to look at all four directions (top, left, bottom, right). We can do this in two iterations.
- For first iteration we can start at top left cell of our bitmap array.
- We visit each cell
- if it is 1 we update the corresponding result cell value with 0
- if it is 0, we take the minimum of the top and left value from the result array and add 1 (new value). If current result cell value is larger than the new value, only then we update the current value with the new value.
- in the second iteration we start from bottom right and visit each cell. We update the value with the same approach by looking at bottom and right values in the result array.
- At the end of both iteration we will get our result array with all calculated values.

**Complexity Analysis**
- Time Complexity: O(n * m)
- Space Complexity O(1)
# Application Structure
- The application reads input from standard in and validates each line based on the problem requirements.
- The **TesCaseRunner** class is responsible for reading the input and showing the result.
- The **TestCaseValidator** class validates each line. This implement **ITestCaseValidaor** which makes it mockable in unit tests.
- There are reusable **rule** classes that are used by **TestCaseValidator** class.
- **Bitmap** class is responsible for validating the bitmap array and showing the result. It has a private constuctor and a static **create** method. We want the object creation to only be done through **create** method so that we can validate bitmap array. It is easier to mock as well.
- **Result** class is used to wrap the result of each validation and gracefully handle the control flow. In case of successful execution, it return **isSuccess** = true with or without data. In case of errors it populates it's **errorMessage** property.
- **ConsoleReader** and **ConsoleWriter** class handles the input and output.These two implements **IReader** and **IWriter** interfaces which helps us mock in tests.
- **jasmine** is used as the test framework. All the validation scenarios are covered.
- Because of the small scope of the application, I did not use any dependency injection framework.

# Running the application
- To to run the application open a terminal in source folder and execute **npm install** and then execute **npm run start**
- To run the tests  execute **npm run test**
