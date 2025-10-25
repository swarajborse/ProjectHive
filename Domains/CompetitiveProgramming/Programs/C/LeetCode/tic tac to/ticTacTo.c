#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BOARD_SIZE 3
#define X 'X'
#define O 'O'

typedef struct {
    int player;
    int computer;
    int draw;
} Score;

int difficulty;
Score score = {.player = 0, .computer = 0, .draw = 0};

void input_difficulty();
void clear_screen();
void print_board(char board[BOARD_SIZE][BOARD_SIZE]);
int check_win(char board[BOARD_SIZE][BOARD_SIZE], char player);
int check_draw(char board[BOARD_SIZE][BOARD_SIZE]);
void play_game();
void player_move(char board[BOARD_SIZE][BOARD_SIZE], char player_mark); // Pass player mark
void computer_move(char board[BOARD_SIZE][BOARD_SIZE], char computer_mark); // Pass computer mark
int is_valid_move(char board[BOARD_SIZE][BOARD_SIZE], int row, int col);

int main() {
    srand(time(NULL));
    int choice;
    input_difficulty();
    do {
        play_game();
        printf("\n\nScore - Player X: %d, Computer: %d, Draws: %d\n", score.player, score.computer, score.draw);
        printf("\nPlay again? (1 for yes, 0 for no): ");
        if (scanf("%d", &choice) != 1) { // Added safety check for input
            while (getchar() != '\n'); // Clear buffer on invalid input
            choice = 0; // Exit loop on bad input
        }
    } while (choice == 1);
    printf("\nBye Bye, thanks for playing.\n");
    return 0;
}

void play_game() {
    char board[BOARD_SIZE][BOARD_SIZE] = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '},
    };
    
    // Determine the markers: Player is always 'X', Computer is always 'O' 
    // The starting player is decided by 'current_turn'
    char player_mark = X;
    char computer_mark = O;

    // Randomly choose who goes first (X or O)
    char current_turn = rand() % 2 == 0 ? player_mark : computer_mark;

    print_board(board);
    
    while (1) {
        if (current_turn == player_mark) {
            player_move(board, player_mark);
            print_board(board);
            
            if (check_win(board, player_mark)) {
                score.player++;
                printf("Congratulation! You have won!!!\n");
                break;
            }
            current_turn = computer_mark;
        } else {
            printf("\nComputer's move (O)...\n");
            computer_move(board, computer_mark);
            print_board(board);
            
            if (check_win(board, computer_mark)) {
                score.computer++;
                printf("I won! But you played well...\n");
                break;
            }
            current_turn = player_mark;
        }

        if (check_draw(board)) {
            score.draw++;
            printf("\nIt's a draw!\n");
            break;
        }
    }
}

int is_valid_move(char board[BOARD_SIZE][BOARD_SIZE], int row, int col) {
    return (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && board[row][col] == ' ');
}

void player_move(char board[BOARD_SIZE][BOARD_SIZE], char player_mark) {
    // NOTE: The single-empty-spot check is removed here, as the main loop's check_draw handles the last move naturally.
    
    int row, col;
    int input_success;
    do {
        printf("\nPlayer %c's turn.", player_mark);
        printf("\nEnter row and column (1-3) for %c: ", player_mark);
        
        // Check if both scanf calls succeed
        input_success = scanf("%d %d", &row, &col) == 2;

        if (input_success) {
            row--; col--; // converting to zero based
        } else {
            // Clear the input buffer if scanf failed (e.g., user entered a character)
            while (getchar() != '\n');
            printf("Invalid input. Please enter two numbers (1-3).\n");
        }
    } while (!input_success || !is_valid_move(board, row, col));
    
    board[row][col] = player_mark;
}

void computer_move(char board[BOARD_SIZE][BOARD_SIZE], char computer_mark) {
    char player_mark = (computer_mark == X) ? O : X; // Opponent's mark
    
    // 1. Play for Immediate win (Computer's mark)
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] == ' ') {
                board[i][j] = computer_mark;
                if (check_win(board, computer_mark)) {
                    return;
                }
                board[i][j] = ' '; // Undo move
            }
        }
    }

    // 2. Play for Immediate Block (Player's mark)
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] == ' ') {
                board[i][j] = player_mark; // Test opponent's move
                if (check_win(board, player_mark)) {
                    board[i][j] = computer_mark; // Block the win
                    return;
                }
                board[i][j] = ' '; // Undo test move
            }
        }
    }

    // GOD Mode Logic (Prevent forks, prioritize center/corners)
    if (difficulty == 2) {
        // 3. Play Center if available
        if (board[1][1] == ' ') {
            board[1][1] = computer_mark;
            return;
        }

        // 4. Play Corner if available
        int corner[4][2] = {
            {0, 0}, {0, 2}, {2, 0}, {2, 2}
        };
        for (int i = 0; i < 4; i++) {
            if (board[corner[i][0]][corner[i][1]] == ' ') {
                board[corner[i][0]][corner[i][1]] = computer_mark;
                return;
            }
        }
    }

    // 5. Play first available move (Random logic for Human/fallback for God)
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] == ' ') {
                board[i][j] = computer_mark;
                return;
            }
        }
    }
}

int check_win(char board[BOARD_SIZE][BOARD_SIZE], char player) {
    // Check rows and columns
    for (int i = 0; i < BOARD_SIZE; i++) {
        if (board[i][0] == player && board[i][1] == player && board[i][2] == player) { // Row
            return 1;
        }

        if (board[0][i] == player && board[1][i] == player && board[2][i] == player) { // Column
            return 1;
        }
    }

    // Check diagonals
    if ((board[0][0] == player && board[1][1] == player && board[2][2] == player) || // Main diagonal
        (board[2][0] == player && board[1][1] == player && board[0][2] == player)) { // Anti-diagonal
        return 1;
    }
    return 0;
}

int check_draw(char board[BOARD_SIZE][BOARD_SIZE]) {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] == ' ') {
                return 0; // Found an empty spot, not a draw
            }
        }
    }
    return 1; // All spots filled, it is a draw
}

void print_board(char board[BOARD_SIZE][BOARD_SIZE]) {
    clear_screen();
    printf("Score - Player X: %d, Computer O: %d, Draws: %d", score.player, score.computer, score.draw);
    printf("\nTic-Tac-Toe\n");

    for (int i = 0 ; i < BOARD_SIZE; i++) {
        printf("\n");
        for (int j = 0; j < BOARD_SIZE; j++) {
            printf(" %c ", board[i][j]);
            if (j < BOARD_SIZE - 1) {
                printf("|");
            }
        }
        if (i < BOARD_SIZE - 1) {
            printf("\n---+---+---");
        }
    }
    printf("\n"); // Moved final newline outside the board loop
}

void input_difficulty() {
    while (1) {
        printf("\nSelect difficulty level:");
        printf("\n1. Human (Standard)");
        printf("\n2. God (Impossible to win)");
        printf("\nEnter your choice: ");
        
        if (scanf("%d", &difficulty) != 1) {
            // Clear the input buffer on invalid input
            while (getchar() != '\n');
            printf("\nInvalid input. Please enter 1 or 2.\n");
            continue;
        }

        if (difficulty != 1 && difficulty != 2) {
            printf("\nIncorrect choice! Please enter (1/2).\n");
        } else {
            break;
        }
    };
}

void clear_screen() {
    #ifdef _Win32
      system("cls");
    #else
      system("clear");
    #endif    
}