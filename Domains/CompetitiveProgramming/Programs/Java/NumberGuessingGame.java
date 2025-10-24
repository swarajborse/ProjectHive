import java.util.Random;
import java.util.Scanner;  

public class NumberGuessingGame {
    public static void main(String[] args) {
        Random random = new Random();
        int actual_number = random.nextInt(100) + 1; // Number between 1 and 100
        int guess = 0;
        int tries = 0;

        Scanner sc = new Scanner(System.in);
        System.out.println("Welcome to the Number Guessing Game!");
        System.out.println("I'm thinking of a number between 1 and 100.");

        while (guess != actual_number) {
            System.out.print("Guess the number: ");
            guess = sc.nextInt();
            tries++;

            if (actual_number>50 && guess > 50 && guess != actual_number) {
                if (actual_number%10 == 0)
                    System.out.println("Hint: The number is greater than 50 and a multiple of 10.");
                else
                    System.out.println("Hint: The number is greater than 50 but not a multiple of 10.");
                if (actual_number % 2 == 0)
                    System.out.println("Hint: The number is even.");
                else
                    System.out.println("Hint: The number is odd."); 
                if (guess < actual_number) {
                    System.out.println("Guess a higher number.");
                } else {
                    System.out.println("Guess a lower number.");
                }       
            } else if (actual_number <= 50 && guess <= 50 && guess != actual_number) {
                if (actual_number % 10 == 0)
                    System.out.println("Hint: The number is 50 or less and a multiple of 10.");
                else
                    System.out.println("Hint: The number is 50 or less but not a multiple of 10.");
                if (actual_number % 2 == 0)
                    System.out.println("Hint: The number is even.");
                else
                    System.out.println("Hint: The number is odd.");
                if (guess < actual_number) 
                    System.out.println("Guess a higher number.");
                else
                    System.out.println("Guess a lower number."); 
                } else if (actual_number<=50 && guess >50 && guess != actual_number) {
                    if (actual_number % 10 == 0)
                    System.out.println("Hint: The number is 50 or less and a multiple of 10.");
                else
                    System.out.println("Hint: The number is 50 or less but not a multiple of 10.");
                if (actual_number % 2 == 0)
                    System.out.println("Hint: The number is even.");
                else
                    System.out.println("Hint: The number is odd.");
                if (guess < actual_number) 
                    System.out.println("Guess a higher number.");
                else
                    System.out.println("Guess a lower number."); 
                }  else if (actual_number>=50 && guess <50 && guess != actual_number) {
                    if (actual_number%10 == 0)
                    System.out.println("Hint: The number is greater than 50 and a multiple of 10.");
                else
                    System.out.println("Hint: The number is greater than 50 but not a multiple of 10.");
                if (actual_number % 2 == 0)
                    System.out.println("Hint: The number is even.");
                else
                    System.out.println("Hint: The number is odd."); 
                if (guess < actual_number) {
                    System.out.println("Guess a higher number.");
                } else {
                    System.out.println("Guess a lower number.");
                }       
                }
            

            
            else 
            System.out.println("Wohooo! You guessed the number correctly! It was " + actual_number + "."); 
        
        }
        System.out.println("You guessed it in " + tries + " tries.");
        System.out.println("Thanks for playing!");
        sc.close();
    }
}
        
    

