import javax.crypto.Cipher;
import javax.crypto.KeyAgreement;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.*;
import java.util.Base64;
import java.util.Scanner;

public class EnhancedCrypToolSimulation {

    private static KeyPair rsaKeyPair;
    private static SecretKey aesKey;
    private static String signedMessage;
    private static KeyPair dhKeyPair;  // Diffie-Hellman key pair
    private static byte[] sharedSecret;  // Shared secret for Diffie-Hellman

    // RSA Key Pair Generation
    private static void generateRSAKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        rsaKeyPair = keyGen.generateKeyPair();
        System.out.println("RSA Key Pair generated successfully.");
    }

    // Diffie-Hellman Key Pair Generation
    private static void generateDHKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("DH");
        keyGen.initialize(2048);
        dhKeyPair = keyGen.generateKeyPair();
        System.out.println("Diffie-Hellman Key Pair generated successfully.");
    }

    // Generate Shared Secret for Diffie-Hellman
    private static void generateSharedSecret(PublicKey otherPartyPublicKey) throws Exception {
        KeyAgreement keyAgreement = KeyAgreement.getInstance("DH");
        keyAgreement.init(dhKeyPair.getPrivate());
        keyAgreement.doPhase(otherPartyPublicKey, true);
        sharedSecret = keyAgreement.generateSecret();
        System.out.println("Shared secret generated successfully.");
    }

    // AES Key Generation
    private static void generateAESKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(128);
        aesKey = keyGen.generateKey();
        System.out.println("AES Key generated successfully.");
    }

    // Encrypt Message with AES Key
    private static String encryptMessageWithAES(String message) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, aesKey);
        byte[] encryptedBytes = cipher.doFinal(message.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // Decrypt Message with AES Key
    private static String decryptMessageWithAES(String encryptedMessage) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, aesKey);
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedMessage);
        return new String(cipher.doFinal(decodedBytes));
    }

    // Main menu and switch case structure
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean exit = false;

        // Initial choice between RSA and Diffie-Hellman
        System.out.println("Choose the algorithm:");
        System.out.println("1. RSA for Digital Signature and Encryption");
        System.out.println("2. Diffie-Hellman for Key Exchange");
        System.out.print("Enter your choice: ");
        int algorithmChoice = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        try {
            if (algorithmChoice == 1) {
                // RSA Menu
                generateRSAKeyPair();
                generateAESKey();
                
                while (!exit) {
                    System.out.println("\n---- RSA Menu ----");
                    System.out.println("1. Sign Message");
                    System.out.println("2. Verify Signature");
                    System.out.println("3. Encrypt Message with AES");
                    System.out.println("4. Decrypt Message with AES");
                    System.out.println("5. Exit");
                    System.out.print("Enter your choice: ");
                    int choice = scanner.nextInt();
                    scanner.nextLine();  // Consume newline

                    switch (choice) {
                        case 1:
                            System.out.print("Enter the message to sign: ");
                            String message = scanner.nextLine();
                            signedMessage = signMessage(message);
                            System.out.println("Message signed successfully.");
                            break;
                        case 2:
                            if (signedMessage == null) {
                                System.out.println("No message has been signed yet.");
                            } else {
                                System.out.print("Enter the message to verify: ");
                                String verifyMessage = scanner.nextLine();
                                boolean isVerified = verifySignature(verifyMessage);
                                System.out.println("Signature Verification: " + (isVerified ? "Valid" : "Invalid"));
                            }
                            break;
                        case 3:
                            System.out.print("Enter message to encrypt with AES: ");
                            String aesMessage = scanner.nextLine();
                            String encryptedMessage = encryptMessageWithAES(aesMessage);
                            System.out.println("Encrypted Message: " + encryptedMessage);
                            break;
                        case 4:
                            System.out.print("Enter message to decrypt with AES: ");
                            String encryptedMsg = scanner.nextLine();
                            String decryptedMessage = decryptMessageWithAES(encryptedMsg);
                            System.out.println("Decrypted Message: " + decryptedMessage);
                            break;
                        case 5:
                            exit = true;
                            System.out.println("Exiting RSA menu...");
                            break;
                        default:
                            System.out.println("Invalid choice. Please try again.");
                            break;
                    }
                }
            } else if (algorithmChoice == 2) {
                // Diffie-Hellman Menu
                generateDHKeyPair();
                
                while (!exit) {
                    System.out.println("\n---- Diffie-Hellman Menu ----");
                    System.out.println("1. Generate Shared Secret");
                    System.out.println("2. Encrypt Message with Shared Secret");
                    System.out.println("3. Decrypt Message with Shared Secret");
                    System.out.println("4. Exit");
                    System.out.print("Enter your choice: ");
                    int choice = scanner.nextInt();
                    scanner.nextLine();  // Consume newline

                    switch (choice) {
                        case 1:
                            // Assuming otherPartyPublicKey is received (for demonstration, we use dhKeyPair's public key)
                            generateSharedSecret(dhKeyPair.getPublic());
                            break;
                        case 2:
                            if (sharedSecret != null) {
                                aesKey = new SecretKeySpec(sharedSecret, 0, 16, "AES");  // Use shared secret as AES key
                                System.out.print("Enter message to encrypt with AES: ");
                                String aesMessage = scanner.nextLine();
                                String encryptedMessage = encryptMessageWithAES(aesMessage);
                                System.out.println("Encrypted Message: " + encryptedMessage);
                            } else {
                                System.out.println("Please generate a shared secret first.");
                            }
                            break;
                        case 3:
                            if (sharedSecret != null) {
                                aesKey = new SecretKeySpec(sharedSecret, 0, 16, "AES");  // Use shared secret as AES key
                                System.out.print("Enter message to decrypt with AES: ");

                                String encryptedMsg = scanner.nextLine();
                                String decryptedMessage = decryptMessageWithAES(encryptedMsg);
                                System.out.println("Decrypted Message: " + decryptedMessage);
                            } else {
                                System.out.println("Please generate a shared secret first.");
                            }
                            break;
                        case 4:
                            exit = true;
                            System.out.println("Exiting Diffie-Hellman menu...");
                            break;
                        default:
                            System.out.println("Invalid choice. Please try again.");
                            break;
                    }
                }
            } else {
                System.out.println("Invalid choice. Exiting program.");
            }
        } catch (Exception e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
        
        scanner.close();
    }

    // Signing and Verifying with RSA for simplicity
    private static String signMessage(String message) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(rsaKeyPair.getPrivate());
        signature.update(message.getBytes());
        byte[] signedBytes = signature.sign();
        return Base64.getEncoder().encodeToString(signedBytes);
    }

    private static boolean verifySignature(String message) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initVerify(rsaKeyPair.getPublic());
        signature.update(message.getBytes());
        byte[] signedBytes = Base64.getDecoder().decode(signedMessage);
        return signature.verify(signedBytes);
    }
}
