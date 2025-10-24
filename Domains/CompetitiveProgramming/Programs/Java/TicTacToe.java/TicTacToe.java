import java.util.Scanner;

public class TicTacToe {
    static char[][] board = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '}
    };

    public static void printBoard() {
        System.out.println("\n-------------");
        for (int i = 0; i < 3; i++) {
            System.out.print("| ");
            for (int j = 0; j < 3; j++) {
                System.out.print(board[i][j] + " | ");
            }
            System.out.println("\n-------------");
        }
    }

    public static boolean isWinner(char player) {
        // Check rows, columns, and diagonals
        for (int i = 0; i < 3; i++) {
            if (board[i][0] == player && board[i][1] == player && board[i][2] == player) return true;
            if (board[0][i] == player && board[1][i] == player && board[2][i] == player) return true;
        }
        if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true;
        if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true;
        return false;
    }

    public static boolean isBoardFull() {
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (board[i][j] == ' ') return false;
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        char currentPlayer = 'X';
        boolean gameOn = true;

        System.out.println("===== TIC TAC TOE GAME =====");
        printBoard();

        while (gameOn) {
            System.out.print("\nPlayer " + currentPlayer + ", enter row and column (0,1,2): ");
            int row = sc.nextInt();
            int col = sc.nextInt();

            if (row < 0 || row > 2 || col < 0 || col > 2) {
                System.out.println("⚠️ Invalid position! Try again.");
                continue;
            }

            if (board[row][col] != ' ') {
                System.out.println("⚠️ Cell already occupied! Try again.");
                continue;
            }

            board[row][col] = currentPlayer;
            printBoard();

            if (isWinner(currentPlayer)) {
                System.out.println("🎉 Player " + currentPlayer + " wins!");
                gameOn = false;
            } else if (isBoardFull()) {
                System.out.println("🤝 It's a Draw!");
                gameOn = false;
            } else {
                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
            }
        }

        sc.close();
    }
}
