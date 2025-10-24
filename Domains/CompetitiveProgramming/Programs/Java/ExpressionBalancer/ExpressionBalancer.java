import java.util.Stack;
import java.util.Scanner;

public class ExpressionBalancer {
    public static boolean isBalanced(String expr) {
        Stack<Character> stack = new Stack<>();

        for (char ch : expr.toCharArray()) {
            // Push opening brackets
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } 
            // Check closing brackets
            else if (ch == ')' || ch == '}' || ch == ']') {
                if (stack.isEmpty()) return false;
                char top = stack.pop();

                if ((ch == ')' && top != '(') ||
                    (ch == '}' && top != '{') ||
                    (ch == ']' && top != '[')) {
                    return false;
                }
            }
        }

        // Stack must be empty for balanced expression
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("===== EXPRESSION BALANCER =====");
        System.out.print("Enter an expression: ");
        String expr = sc.nextLine();

        if (isBalanced(expr))
            System.out.println("✅ Expression is Balanced!");
        else
            System.out.println("❌ Expression is NOT Balanced!");

        sc.close();
    }
}
