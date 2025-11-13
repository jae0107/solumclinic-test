t = int(input())
for _ in range(t):
    n = int(input())
    if n < 4 or n % 2 != 0: # if input < 4 or odd number, return -1
        print(-1)
        continue
    
    # use the largest unit (6) as much as possible
    min_crafts = n // 6
    if n % 6 != 0:
        min_crafts += 1
    
    # use the smallest unit (4) as much as possible
    max_crafts = n // 4
    
    print(min_crafts, max_crafts)