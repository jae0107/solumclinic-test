t = int(input())
for _ in range(t):
    x, n = map(int, input().split()) # # get string e.g "2 5" and split by space
    print(x if n % 2 != 0 else 0) # return the first number if the second number is not even number, if the second number is even return 0
