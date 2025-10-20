/*
Algorithm: Sieve of Eratosthenes
Category: Number Theory
Difficulty: Easy
Link: https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html

Problem Statement:
Given an integer n, find all prime numbers less than or equal to n.

The Sieve of Eratosthenes efficiently finds all primes up to n by marking
multiples of each prime starting from 2, the smallest prime number.

Input:
A single integer n (2 ≤ n ≤ 10^6)

Output:
All prime numbers ≤ n.

Example:
Input:
10

Output:
2 3 5 7

Explanation:
Starting from 2, we mark all multiples of 2 as non-prime (4, 6, 8, 10),
then move to the next unmarked number (3), and mark its multiples.
Remaining unmarked numbers are primes.

Approach:
1. Create a boolean array `isPrime` initialized as true for all numbers ≥ 2.
2. For each i from 2 to √n:
   - If `isPrime[i]` is true, mark all multiples of i as false.
3. Print all numbers i where `isPrime[i]` is true.

Time Complexity: O(n log log n)
Space Complexity: O(n)

Contributor: SampleContributor
*/

#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main()
{
   ll n;
   cin>>n;
   vector<ll> isPrime(n+1,true);
   for(ll i=2;(i*i)<=n;i++){
    if(isPrime[i]){
             for(ll j=i*i;(j)<=n;j+=i){
          isPrime[j]=false;
       }
    }
      
   }
   cout<<"Prime numbers ";
   for(ll i=2;i<=n;i++){
          if(isPrime[i]){
              cout<<i<<endl;
          }
   }
    return 0;
}