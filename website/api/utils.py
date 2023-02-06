from itertools import combinations_with_replacement
from math import factorial

def print_combinations():
    for i in range(0,8):
        comb = combinations_with_replacement([0,1,2,3,4,5,6,7],i)
        for i in list(comb):
            if len(i) == 7 and sum(i) <= 7:
                print(i)

def binom(n,k):
    return factorial(n)/(factorial(k)*factorial(n-k))

def group_probability(false, all, false_amount, all_amount):
    if false < false_amount: return 0
    elif all - false < all_amount - false_amount: return 0
    elif all < all_amount: return 0
    return binom(false,false_amount) * binom(all-false,all_amount-false_amount) / binom(all,all_amount)

def probability_of_0_mistakes(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

def probability_of_1_mistake(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

print(
    probability_of_0_mistakes(0,0,0,0,0,0,0) +\
    probability_of_1_mistake(0,0,0,0,0,0,0)
)


"""
2
2
1
4
1
2
1
"""