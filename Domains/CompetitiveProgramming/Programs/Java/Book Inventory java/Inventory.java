import java.util.*;
import java.io.*;
class FantasyBooks 
 {
  public static Vector<String> fantasyBooks = new Vector<>();
  public static Vector<Double> fantasyprices = new Vector<>();
  Scanner in = new Scanner (System.in);
  public void initializefantasybooks()
  {
   fantasyBooks.add("A Wizard of Earthsea");
   fantasyBooks.add("Children of Blood and Bone");
   fantasyBooks.add("Circe");
   fantasyBooks.add("The Buried Giant");
   fantasyBooks.add("Jade City");

   fantasyprices.add(340.0);
   fantasyprices.add(429.86);
   fantasyprices.add(252.0);
   fantasyprices.add(400.24);
   fantasyprices.add(411.22);
  }
  public void listoffantasybook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Fantasy Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < fantasyBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + fantasyBooks.get(i) + "( Price : " + fantasyprices.get(i) + ")");
   }
  }  
  public void buy1(String bookName)
{
    try 
    {
        if (fantasyBooks.contains(bookName)) 
        {
            System.out.println("Enter client name: ");
            String clientName = in.nextLine();  
            FileWriter writer = new FileWriter("client_purchase_info.txt", true);
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
            writer.close();
            System.out.println("Purchase recorded successfully.");
        }
        else 
          {
               System.out.println("Book not available.");
          }
      }
        catch (IOException e)
        {
            System.out.println("An error occurred while recording purchase.");
            e.printStackTrace();
        }
   }
  
  public void buyfantasybook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   in.nextLine();
   if (num>=1 && num<=fantasyBooks.size())
   {
    String bookName = fantasyBooks.get(num-1);
    buy1(bookName);
    System.out.println(" have bought "+fantasyBooks.get(num-1)+" of Rs." +fantasyprices.get(num-1));
    fantasyBooks.remove(num-1);
    fantasyprices.remove(num-1); 
    }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class RomanticBooks extends FantasyBooks
{
  public static Vector<String> romanticBooks = new Vector<>();
  public static Vector<Double> romanticprices = new Vector<>();
  Scanner in = new Scanner (System.in);
  public void initializeromanticbooks()
  {
   romanticBooks.add("Red, White & Royal Blue");
   romanticBooks.add("Twilight, Book 1: Twilight");
   romanticBooks.add("Outlander");
   romanticBooks.add("Call Me by Your Name");
   romanticBooks.add("Me Before You");

   romanticprices.add(429.86);
   romanticprices.add(391.16);
   romanticprices.add(340.06);
   romanticprices.add(713.18);
   romanticprices.add(317.88);
 }
  public void listofromanticbook()
 {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Romantic Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < romanticBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + romanticBooks.get(i) + "( Price : " + romanticprices.get(i) + ")");
   }
 }  
 
public void buy2(String bookName)
 {
    try {
        if (romanticBooks.contains(bookName))
        {
        System.out.println("Enter client name: ");
        String clientName = in.nextLine();
        FileWriter writer = new FileWriter("client_purchase_info.txt", true);
        writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        writer.close();
        System.out.println("Purchase recorded successfully.");
      }
    else
    {
        System.out.println("Book not available.");
      }
    } catch (IOException e) {
      System.out.println("An error occurred while recording purchase.");
      e.printStackTrace();
    }
}
    public void buyromanticbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   in.nextLine();
   if (num>=1 && num<=romanticBooks.size())
   {
    String bookName = romanticBooks.get(num-1);
    buy2(bookName);
    System.out.println("You have bought "+romanticBooks.get(num-1)+" of Rs." +romanticprices.get(num-1));
    romanticBooks.remove(num-1);
    romanticprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class HorrorBooks extends RomanticBooks
 {
  public static Vector<String> horrorBooks = new Vector<>();
  public static Vector<Double> horrorprices = new Vector<>();
  private Scanner in = new Scanner (System.in);
  public void initializehorrorbooks()
  {
   horrorBooks.add("The Exorcist");
   horrorBooks.add("The Last House on Needless Street");
   horrorBooks.add("Things Have Gotten Worse Since We Last Spoke");
   horrorBooks.add("Ring");
   horrorBooks.add("The Hunger");

   horrorprices.add(499.14);
   horrorprices.add(479.66);
   horrorprices.add(340.06);
   horrorprices.add(443.90);
   horrorprices.add(517.38);
  }
  public void listofhorrorbook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Horror Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < horrorBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + horrorBooks.get(i) + "( Price : " + horrorprices.get(i) + ")");
   }
  }
 public void buy3(String bookName) {
    try {
        
        if (!horrorBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;  
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine())
 {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

        
        try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}
    
  public void buyhorrorbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=horrorBooks.size())
   {
    String bookName = horrorBooks.get(num-1);
    buy3(bookName);
    System.out.println("You have bought "+horrorBooks.get(num-1)+" of Rs." +horrorprices.get(num-1));
    horrorBooks.remove(num-1);
    horrorprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class ThrillerBooks extends HorrorBooks
 {
  public static Vector<String> thrillerBooks = new Vector<>();
  public static Vector<Double> thrillerprices = new Vector<>();
  private Scanner in = new Scanner (System.in);
  public void initializethrillerbooks()
  {
   thrillerBooks.add("My Sister, the Serial Killer");
   thrillerBooks.add("The Silence of the Lambs");
   thrillerBooks.add("The Lincoln Lawyer");
   thrillerBooks.add("Lady Joker, Volume 1");
   thrillerBooks.add("The Sympathizer");

   thrillerprices.add(623.85);
   thrillerprices.add(375.46);
   thrillerprices.add(340.06);
   thrillerprices.add(884.16);
   thrillerprices.add(820.80);
  }
  public void listofthrillerbook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of  Thriller Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < thrillerBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + thrillerBooks.get(i) + "( Price : " + thrillerprices.get(i) + ")");
   }
  } 
public void buy4(String bookName) {
    try {
        
        if (!thrillerBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return; 
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) 
         {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

            try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}  
  public void buythrillerbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=thrillerBooks.size())
   {
    String bookName = thrillerBooks.get(num-1);
    buy4(bookName);
    System.out.println("You have bought "+thrillerBooks.get(num-1)+" of Rs." +thrillerprices.get(num-1));
    thrillerBooks.remove(num-1);
    thrillerprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class MysteryBooks extends ThrillerBooks
 {
  public static Vector<String> mysteryBooks = new Vector<>();
  public static Vector<Double> mysteryprices = new Vector<>();
  private Scanner in = new Scanner (System.in);
  public void initializemysterybooks()
  {
   mysteryBooks.add("Gone Girl");
   mysteryBooks.add("Big Little Lies");
   mysteryBooks.add("In the Woods");
   mysteryBooks.add("The last good kiss");
   mysteryBooks.add("Out");

   mysteryprices.add(640.00);
   mysteryprices.add(425.26);
   mysteryprices.add(340.06);
   mysteryprices.add(317.88);
   mysteryprices.add(375.46);
  }
  public void listofmysterybook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of  Mystery Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < mysteryBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + mysteryBooks.get(i) + "( Price : " + mysteryprices.get(i) + ")");
   }
  }   
 public void buy5(String bookName) {
    try {
            if (!mysteryBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;  
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

        
        try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}  
  public void buymysterybook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=mysteryBooks.size())
   {
    String bookName = mysteryBooks.get(num-1);
    buy5(bookName);
    System.out.println("You have bought "+mysteryBooks.get(num-1)+" of Rs." +mysteryprices.get(num-1));
    mysteryBooks.remove(num-1);
    mysteryprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class Action_and_AdventureBooks extends MysteryBooks
 {
  public static Vector<String> action_and_adventureBooks = new Vector<>();
  public static Vector<Double> action_and_adventureprices = new Vector<>();
  private Scanner in = new Scanner (System.in);
  public void initializeaction_and_adventurebooks()
  {
   action_and_adventureBooks.add("The Da Vinci Code");
   action_and_adventureBooks.add("The Hobbit");
   action_and_adventureBooks.add("Treasure Island");
   action_and_adventureBooks.add("Moby Dick");
   action_and_adventureBooks.add("Jurassic Park");

   action_and_adventureprices.add(340.06);
   action_and_adventureprices.add(1668.00);
   action_and_adventureprices.add(340.06);
   action_and_adventureprices.add(317.88);
   action_and_adventureprices.add(4029.50);
  }
  public void listofaction_and_adventurebook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Action And Adventure Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < action_and_adventureBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + action_and_adventureBooks.get(i) + "( Price : " + action_and_adventureprices.get(i) + ")");
   }
  } 
  public void buy6(String bookName) {
    try {
            if (!action_and_adventureBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;     
     }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

            try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}      
  public void buyaction_and_adventurebook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=action_and_adventureBooks.size())
   {
    String bookName = action_and_adventureBooks.get(num-1);
    buy6(bookName);
    System.out.println("You have bought "+action_and_adventureBooks.get(num-1)+" of Rs." +action_and_adventureprices.get(num-1));
    action_and_adventureBooks.remove(num-1);
    action_and_adventureprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class Autobiographies extends Action_and_AdventureBooks
 {
  public static Vector<String> autobiographiesBooks = new Vector<>();
  public static Vector<Double> autobiographiesprices = new Vector<>();
  Scanner in = new Scanner (System.in);
  public void initializeautobiographiesbooks()
  {
   autobiographiesBooks.add("The Story of My Experiments with Truth");
   autobiographiesBooks.add("Wings of Fire");
   autobiographiesBooks.add("An Autobiography");
   autobiographiesBooks.add("Mein Kampf");
   autobiographiesBooks.add("Mike Tyson : Undisputed Truth");

   autobiographiesprices.add(178.23);
   autobiographiesprices.add(750.00);
   autobiographiesprices.add(340.06);
   autobiographiesprices.add(317.88);
   autobiographiesprices.add(416.5);
  }
  public void listofautobiographiesbook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Autobiographies are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < autobiographiesBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + autobiographiesBooks.get(i) + "( Price : " + autobiographiesprices.get(i) + ")");
   }
  } 
 public void buy7(String bookName) {
    try {
            if (!autobiographiesBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;  
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

           try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}    
   
  public void buyautobiographiesbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=autobiographiesBooks.size())
   {
    String bookName = autobiographiesBooks.get(num-1);
    buy7(bookName);
    System.out.println("You have bought "+autobiographiesBooks.get(num-1)+" of Rs." +autobiographiesprices.get(num-1));
    autobiographiesBooks.remove(num-1);
    autobiographiesprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class Textbooks extends Autobiographies
 {
  public static Vector<String> textBooks = new Vector<>();
  public static Vector<Double> textprices = new Vector<>();
  Scanner in = new Scanner (System.in);
  public void initializetextbooks()
  {
   textBooks.add("Wuthering Heights");
   textBooks.add("To Kill A MockingBird");
   textBooks.add("1984");
   textBooks.add("Fahrenheit 451");
   textBooks.add("One Hundred Years of Solitude");

   textprices.add(178.23);
   textprices.add(317.88);
   textprices.add(178.23);
   textprices.add(282.13);
   textprices.add(425.26);
  }
  public void listoftextbook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Textbook are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < textBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + textBooks.get(i) + "( Price : " + textprices.get(i) + ")");
   }
  }
  public void buy8(String bookName) {
    try {
        
        if (!textBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;  
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

     
        try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}  
    
  public void buytextbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=textBooks.size())
   {
    String bookName = textBooks.get(num-1);
    buy8(bookName);
    System.out.println("You have bought "+textBooks.get(num-1)+" of Rs." +textprices.get(num-1));
    textBooks.remove(num-1);
    textprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class Biographies extends Textbooks
 {
  public static Vector<String> biographiesBooks = new Vector<>();
  public static Vector<Double> biographiesprices = new Vector<>();
  Scanner in = new Scanner (System.in);
  public void initializebiographiesbooks()
  {
   biographiesBooks.add("Steve Jobs");
   biographiesBooks.add("Will in the World : How Shakespeare Became Shakespeare");
   biographiesBooks.add("Alexander Hamilton");
   biographiesBooks.add("Mao : The Untold Story");
   biographiesBooks.add("The Power Broker");

   biographiesprices.add(425.26);
   biographiesprices.add(525.91);
   biographiesprices.add(416.53);
   biographiesprices.add(525.91);
   biographiesprices.add(327.26);
  }
  public void listofbiographiesbook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Biographies are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < biographiesBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + biographiesBooks.get(i) + "( Price : " + biographiesprices.get(i) + ")");
   }
  } 
  public void buy9(String bookName) {
    try {
            if (!biographiesBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;  
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) {
            in.nextLine();  
        }
        String clientName = in.nextLine(); 

        // Write client name and book purchased to a file
        try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }
        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}  
   
  public void buybiographiesbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=biographiesBooks.size())
   {
    String bookName = biographiesBooks.get(num-1);
    buy9(bookName);
    System.out.println("You have bought "+biographiesBooks.get(num-1)+" of Rs." +biographiesprices.get(num-1));
    biographiesBooks.remove(num-1);
    biographiesprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class CodingBooks extends Biographies
 {
  public static Vector<String> codingBooks = new Vector<>();
  public static Vector<Double> codingprices = new Vector<>();
  Scanner in = new Scanner (System.in);
  public void initializecodingbooks()
  {
   codingBooks.add("Head First Java");
   codingBooks.add("Effective Java");
   codingBooks.add("Thinking in Java");
   codingBooks.add("Clean Code");
   codingBooks.add("Java Concurrency in Practice");

   codingprices.add(2221.93);
   codingprices.add(3152.00);
   codingprices.add(1780.23);
   codingprices.add(2238.21);
   codingprices.add(3008.75);
  }
  public void listofcodingbook()
  {
   System.out.println ("---------------------------------------------------------------------------------------");
   System.out.println ("Our list of Coding Books are : ");
   System.out.println ("---------------------------------------------------------------------------------------");

   for (int i = 0; i < codingBooks.size(); i++) 
   {
    System.out.println((i + 1) + "." + codingBooks.get(i) + "( Price : " + codingprices.get(i) + ")");
   }
  }    
  public void buy10(String bookName) {
    try {
            if (!codingBooks.contains(bookName)) {
            System.out.println("Book not available.");
            return;  
        }

        System.out.println("Enter client name: ");
        if (in.hasNextLine()) {
            in.nextLine();          }
        String clientName = in.nextLine(); 

            try (FileWriter writer = new FileWriter("client_purchase_info.txt", true)) {
            writer.write("Client: " + clientName + ", Book: " + bookName + "\n");
        }

        System.out.println("Purchase recorded successfully.");
    } catch (IOException e) {
        System.out.println("An error occurred while recording the purchase.");
        e.printStackTrace();
    }
}    
  public void buycodingbook()
  {
   System.out.println("Enter index number of book to buy : ");
   int num = in.nextInt();
   if (num>=1 && num<=codingBooks.size())
   {
    String bookName = codingBooks.get(num-1);
    buy10(bookName);
    System.out.println("You have bought "+codingBooks.get(num-1)+" of Rs." +codingprices.get(num-1));
    codingBooks.remove(num-1);
    codingprices.remove(num-1);
   }
   else
   {
    System.out.println("Invalid Row Number . . .");
   }
  } 
 }

class BookStore extends CodingBooks
{
 Scanner in = new Scanner (System.in);
 public void ListofBooks()
 {
  System.out.println("Catgories : ");
  System.out.println("\n1. Fantasy Books");
  System.out.println("\n2. Romantic Books");
  System.out.println("\n3. Horror Books");
  System.out.println("\n4. Thriller Books");
  System.out.println("\n5. Mystery Books");
  System.out.println("\n6. Action and Adventure Books");
  System.out.println("\n7. Autobiographies");
  System.out.println("\n8. TextBooks");
  System.out.println("\n9. Biograhies");
  System.out.println("\n10. Coding Books");
  System.out.println("\n0. Exit");	
 }
}
 
class Inventory extends BookStore
{
 Scanner in = new Scanner (System.in);
 public static void main(String[]args)
 {
  Inventory book = new Inventory();
  System.out.println("----------------------------- Welcome to Epic Reads Heaven store -----------------------------");
  book.ListofBooks();
  System.out.println("----------------------------------------------------------------------------------------------------");
  int choice; 
  int ch;
  do
  {
   System.out.println("Enter your choice from categories : ");
   choice = book.in.nextInt();
   switch(choice)
   {
    case 1: book.initializefantasybooks();
            book.listoffantasybook();
            System.out.println("\n1.Viewing List of Fantasy Books\n2.Buying Fantasy Book\n3.Exit");
            do {
            System.out.println("Enter any one choice for fantasy books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listoffantasybook();
                     break;
             case 2: book.buyfantasybook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3 );
            break;

    case 2: book.initializeromanticbooks();
            book.listofromanticbook();
            System.out.println("\n1.Viewing List of Romantic Books\n2.Buying Romantic Book\n3.Exit");
            do {
            System.out.println("Enter any one choice for romantic books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofromanticbook();
                     break;
             case 2: book.buyromanticbook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3 );
            break;

    case 3: book.initializehorrorbooks();
            book.listofhorrorbook();
            System.out.println("\n1.Viewing List of Horror Books\n2.Buying Horror Book\n3.Exit");
            do {
            System.out.println("Enter any one choice for horror books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofhorrorbook();
                     break;
             case 2: book.buyhorrorbook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
            }
            }while(ch != 3 );
            break;
     
    case 4: book.initializethrillerbooks();
            book.listofthrillerbook();
            System.out.println("\n1.Viewing List of Thriller Books\n2.Buying Thriller Book\n3.Exit");
            do {
            System.out.println("Enter any one choice for thriller books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofthrillerbook();
                     break;
             case 2: book.buythrillerbook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                 
            }
            }while(ch != 3);
            break;

    case 5: book.initializemysterybooks();
            book.listofmysterybook();
            System.out.println("\n1.Viewing List of Mystery Books\n2.Buying Mystery Book\n3.Exit");
            do {
            System.out.println("Enter any one choice for mystery books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofmysterybook();
                     break;
             case 2: book.buymysterybook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3 );
            break;

    case 6: book.initializeaction_and_adventurebooks();
            book.listofaction_and_adventurebook();
            System.out.println("\n1.Viewing List of Action And Adventure Books\n2.Buying Action And Adventure Book\n3.Exit");
            do {
            System.out.println("Enter any one choice for action and adventure books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofaction_and_adventurebook();
                     break;
             case 2: book.buyaction_and_adventurebook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3 );
            break;

    case 7: book.initializeautobiographiesbooks();
            book.listofautobiographiesbook();
            System.out.println("\n1.Viewing List of Autobiographies\n2.Buying Autobiographies \n3.Exit");
            do {
            System.out.println("Enter any one choice for autobiographies : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofautobiographiesbook();
                     break;
             case 2: book.buyautobiographiesbook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3 );
            break;

    case 8: book.initializetextbooks();
            book.listoftextbook();
            System.out.println("\n1.Viewing List of TextBooks\n2.Buying Textbooks \n3.Exit");
            do {
            System.out.println("Enter any one choice for Textbooks : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listoftextbook();
                     break;
             case 2: book.buytextbook();
                     break;
             case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3);
            break;

    case 9: book.initializebiographiesbooks();
            book.listofbiographiesbook();
            System.out.println("\n1.Viewing List of Biographies\n2.Buying Biographies \n3.Exit");
            do {
            System.out.println("Enter any one choice for Biographies : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofbiographiesbook();
                     break;
             case 2: book.buybiographiesbook();
                     break;
	     case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                      
            }
            }while(ch != 3 );
            break;
  

   case 10: book.initializecodingbooks();
            book.listofcodingbook();
            System.out.println("\n1.Viewing List of Coding Books\n2.Buying Coding Books \n3.Exit");
            do {
            System.out.println("Enter any one choice for Coding Books : ");
            ch = book.in.nextInt(); 
            switch (ch)
            {
             case 1: book.listofcodingbook();
                     break;
             case 2: book.buycodingbook();
                     break;
	     case 3: System.out.println("Exiting...");  
                     break;
            default: System.out.println("Invalid choice! Please enter 1, 2, or 3.");
                     
            }
            }while(ch != 3 );
            break;
}
  }while(choice>0 && choice<10);
   System.out.println("Thank You . . . ");
   System.out.println("Do visit again . . . ");
 }
}