#include <bits/stdc++.h>
using namespace std;

vector<int> plusOne(vector<int>& digits) {
    if (digits.back() < 9) {
        digits.back() += 1;
    } else {
        digits.back() = 0;
        for (int i = digits.size() - 2; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i] += 1;
                return digits;
            } else {
                digits[i] = 0;
            }
        }
        digits.insert(digits.begin(), 1);
    }
    return digits;
}

int main() {
    vector<int> nums;
    int size;
    cout << "Enter the size of vector: ";
    cin >> size;

    cout << "Enter the elements: ";
    for (int i = 0; i < size; i++) {
        int x;
        cin >> x;
        nums.push_back(x); 
    } 

    vector<int> result = plusOne(nums);

    cout << "Result: ";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i] << " ";
    }
    cout << endl;
}
