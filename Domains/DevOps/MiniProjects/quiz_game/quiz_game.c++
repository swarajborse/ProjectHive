#include <iostream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;

// Question structure
struct Question {
    string q;
    string options[4];
    int correct;
};

// Function to run the quiz
void runQuiz(Question questions[], int n) {
    string player;
    cout << "Enter your name: ";
    cin.ignore();
    getline(cin, player);

    int score = 0;
    srand(time(0));

    // Randomize question order
    int asked[100] = {0};
    int count = 0;

    while (count < n) {
        int idx = rand() % n;
        if (asked[idx]) continue; // skip if already asked

        asked[idx] = 1;
        count++;

        cout << "\nQ" << count << ": " << questions[idx].q << endl;
        for (int i = 0; i < 4; i++)
            cout << i + 1 << ". " << questions[idx].options[i] << endl;

        int ans;
        cout << "Your answer (1-4): ";
        cin >> ans;

        if (ans == questions[idx].correct) {
            cout << "✅ Correct!\n";
            score++;
        } else {
            cout << "❌ Wrong! Correct answer: " << questions[idx].options[questions[idx].correct - 1] << endl;
        }
    }

    cout << "\n🎉 " << player << ", your final score: " << score << "/" << n << endl;
}

int main() {
    // Array of questions
    Question questions[] = {
        {"What is the capital of France?", {"London", "Paris", "Rome", "Berlin"}, 2},
        {"Which language is used for system programming?", {"HTML", "Python", "C", "SQL"}, 3},
        {"Who invented C language?", {"Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Linus Torvalds"}, 2},
        {"What is 9 * 9?", {"81", "72", "99", "79"}, 1},
        {"Which planet is known as the Red Planet?", {"Earth", "Mars", "Jupiter", "Venus"}, 2}
    };

    int n = sizeof(questions) / sizeof(questions[0]);
    char choice;

    do {
        runQuiz(questions, n);
        cout << "\nDo you want to play again? (y/n): ";
        cin >> choice;
    } while (choice == 'y' || choice == 'Y');

    cout << "\nThank you for playing! 👋\n";
    return 0;
}
