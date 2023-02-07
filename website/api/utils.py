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

def probability_of_0_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

def probability_of_1_point_loss(m1,m2,m3,m4,m5,m6,m7):
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

def probability_of_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,1,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,1,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,1,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,2,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

def probability_of_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,3,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

def probability_of_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,1,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,2,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,2,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,2,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

def probability_of_6_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,3,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,3,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)
    
def probability_of_1_1_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1)

def probability_of_1_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,3,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,3,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1)

def probability_of_1_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_6_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,1,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,3,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,1,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,3,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,3,3) *\
    group_probability(m5,25,2,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,0,1)

def probability_of_2_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_3_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_1_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1)

def probability_of_1_1_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,3,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1)

def probability_of_1_1_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_2_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_2_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,1,10) *\
    group_probability(m2,78,1,4) *\
    group_probability(m3,204,0,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,0,2) *\
    group_probability(m6,39,1,2) *\
    group_probability(m7,35,0,1)

def probability_of_2_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_1_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return group_probability(m1,395,1,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,1,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,0,2) *\
    group_probability(m7,35,1,1) +\
    group_probability(m1,395,0,10) *\
    group_probability(m2,78,0,4) *\
    group_probability(m3,204,1,3) *\
    group_probability(m4,98,0,3) *\
    group_probability(m5,25,1,2) *\
    group_probability(m6,39,1,2) *\
    group_probability(m7,35,1,1)

def probability_of_1_1_1_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_1_4_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_2_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def probability_of_1_1_1_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7):
    return 0

def p(m1,m2,m3,m4,m5,m6,m7):
    return probability_of_0_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_point_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_6_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_6_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_2_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_3_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_1_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_2_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_2_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_2_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_1_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_1_3_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_1_4_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_2_3_points_loss(m1,m2,m3,m4,m5,m6,m7)  +\
    probability_of_1_2_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7) +\
    probability_of_1_1_1_2_2_points_loss(m1,m2,m3,m4,m5,m6,m7)

print(p(0,0,0,0,0,0,0))
print(p(395,78,204,98,25,39,35))