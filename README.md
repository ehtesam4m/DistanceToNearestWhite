# Problem Statement

This application
● reads the description of the bitmap from the standard input;
● for each pixel, computes the distance to the nearest white;
● writes the results to the standard output.
Input
The number of test cases t (1≤t≤1000) is in the first line of input, then t test cases follow
separated by an empty line. In the first line of each test case there is a pair of integer numbers
n, m separated by a single space, 1<=n <=182, 1<=m<=182. In each of the following n lines of
the test case exactly one zero-one word of length m, the description of one line of the bitmap, is
written. On the j-th position in the line (i+1), 1 <= i <= n, 1 <= j <= m, is '1' if, and only if the pixel
(i,j) is white.
Output
In the i-th line for each test case, 1<=i<=n, there should be written m integers f(i,1),...,f(i,m)
separated by single spaces, where f(i,j) is the distance from the pixel (i,j) to the nearest white
pixel. Example:
Input:
1
3 4
0001
0011
0110
Output
3 2 1 0
2 1 0 0
1 0 0 1


# Distance Calculation Approach
The distance of a cell from it's nearest white (1) can be computed from looking at all it's neighbours. In this case we need to take the minimum distance to nearest white from all it's neighbours and add one. Dynamic programming is used to calculate the distance. Here are the steps:
	- A 2D result array is initalized with each cell populated with a large value (for example number rows + number of 	columns) 
	- For each cell we need to look at all for directions (top, left, bottom, right). We can do this in two iterations.
    - For first iteration we will start at top left cell of our bitmap array.
        - We visit each cell
        - if it is 1 we update the value with 0
        - 