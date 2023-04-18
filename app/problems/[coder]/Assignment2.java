import java.util.Random;
import java.util.concurrent.Semaphore;

public class ProducerConsumer {
    // Define the semaphores
    static Semaphore empty = new Semaphore(4, true);
    static Semaphore full = new Semaphore(0, true);
    static Semaphore mutex = new Semaphore(1, true);

    // Define the buffer for holding the certificates
    static String[] buffer = new String[4];

    public static void main(String[] args) {
        // Create the producer and consumer threads
        Thread producer = new Thread(new Producer());
        Thread consumer = new Thread(new Consumer());

        // Start the threads
        producer.start();
        consumer.start();
    }

    // Define the producer thread
    static class Producer implements Runnable {
        @Override
        public void run() {
            // Define the random number generator
            Random rand = new Random();

            while (true) {
                // Generate the certificate details
                String model = "";
                switch (rand.nextInt(3)) {
                    case 0:
                        model = "M1";
                        break;
                    case 1:
                        model = "M2";
                        break;
                    case 2:
                        model = "M3";
                        break;
                }

                String serialNumber = "";
                for (int i = 0; i < 5; i++) {
                    char c = (char)(rand.nextInt(36) + 48);
                    if (c >= 58) c += 7;
                    serialNumber += c;
                }

                String color = "";
                switch (rand.nextInt(3)) {
                    case 0:
                        color = "Blue";
                        break;
                    case 1:
                        color = "Orange";
                        break;
                    case 2:
                        color = "Green";
                        break;
                }

                String code = "";
                switch (model) {
                    case "M1":
                        code = "0000";
                        break;
                    case "M2":
                        for (int i = 0; i < 4; i++) {
                            char c = (char)(rand.nextInt(26) + 65);
                            code += c;
                        }
                        break;
                    case "M3":
                        String codeLetters = "";
                        for (int i = 0; i < 8; i++) {
                            char c = (char)(rand.nextInt(26) + 65);
                            while (codeLetters.indexOf(c) >= 0) {
                                c = (char)(rand.nextInt(26) + 65);
                            }
                            codeLetters += c;
                        }
                        int codeSum = 0;
                        for (int i = 0; i < codeLetters.length(); i++) {
                            codeSum += (int)codeLetters.charAt(i) - 64;
                        }
                        for (int i = 0; i < 4; i++) {
                            code += codeSum % 10;
                            codeSum /= 10;
                        }
                        break;
                }

                int warranty = 0;
                switch (model) {
                    case "M1":
                        warranty = 1;
                        break;
                    case "M2":
                        warranty = 2;
                        break;
                    case "M3":
                        warranty = 3;
                        break;
                }
                if (warranty < 3) {
                    warranty += rand.nextInt(3);
                }

                int manufacturerPrice = 0;
                switch (model) {
                    case "M1":
                        manufacturerPrice = 850;
                        break;
                    case "M2":
                        manufacturerPrice = 1325;
                        break;
                    case "M3":
manufacturerPrice = 1950;
break;
default:
// If the model is not recognized, exit the program
System.out.println("Unknown model: " + model);
System.exit(1);
}
            // Generate the serial number
            String serialNumber = "";
            for (int j = 0; j < 5; j++) {
                serialNumber += alphanumeric.charAt(rand.nextInt(alphanumeric.length()));
            }

            // Generate the color
            String color = colors[rand.nextInt(colors.length)];

            // Generate the code
            String code = "";
            switch (model) {
                case "M1":
                    code = "0000";
                    break;
                case "M2":
                    for (int j = 0; j < 4; j++) {
                        int index = rand.nextInt(alphabet.length());
                        code += alphabet.charAt(index);
                        if (index > 9) {
                            code = code.substring(0, code.length() - 1) + (index % 10);
                        }
                    }
                    break;
                case "M3":
                    int[] codeInts = new int[4];
                    for (int j = 0; j < 8; j += 2) {
                        int index1 = alphabet.indexOf(code.charAt(j));
                        int index2 = alphabet.indexOf(code.charAt(j + 1));
                        codeInts[j / 2] = (index1 + index2) % 10;
                    }
                    code = "";
                    for (int j = 3; j >= 0; j--) {
                        code += codeInts[j];
                    }
                    break;
            }

            // Generate the warranty
            int warranty;
            switch (model) {
                case "M1":
                    warranty = 1;
                    break;
                case "M2":
                    warranty = 2;
                    break;
                case "M3":
                    warranty = 3;
                    break;
                default:
                    // If the model is not recognized, exit the program
                    System.out.println("Unknown model: " + model);
                    System.exit(1);
            }
            // Extend warranty randomly
            if (rand.nextBoolean() && warranty < 3) {
                warranty += 1;
            }
            if (rand.nextBoolean() && warranty < 3) {
                warranty += 1;
            }

            // Print the certificate
            System.out.println("OUTPUT BY PRODUCER: " + model + " " + serialNumber + " " + color + " " + code + " " + warranty + " " + manufacturerPrice);
            // Produce the certificate to the buffer
            try {
                empty.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            buffer.add(new Certificate(model, serialNumber, color, code, warranty, manufacturerPrice));
            full.release();
        }
    }
}
}

class Consumer implements Runnable {
private ArrayList<Certificate> buffer;
private Semaphore full, empty;
private Random rand;
public Consumer(ArrayList<Certificate> buffer, Semaphore full, Semaphore empty) {
    this.buffer = buffer;
    this.full = full;
    this.empty = empty;
    this.rand = new Random();
}

@Override
public void run() {
    while (true) {
        try {
            full.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Certificate certificate = buffer.remove(0);
        empty.release();

        // Calculate the retail price
        double retailPrice = certificate.getManufacturerPrice();
        String model = certificate.getModel();
        String color = certificate.getColor();
        int warranty = certificate.getWarranty();

        switch (model) {
            case "X1":
manufacturerPrice = 850;
break;
case "X2":
manufacturerPrice = 975;
break;
case "X3":
manufacturerPrice = 1100;
break;
case "Y1":
manufacturerPrice = 800;
break;
case "Y2":
manufacturerPrice = 925;
break;
case "Y3":
manufacturerPrice = 1050;
break;
default:
System.out.println("Invalid model entered.");
break;
}
    // Calculate retail price based on manufacturer price and markup percentage
    double retailPrice = manufacturerPrice * (1 + markupPercentage);
    
    // Display the retail price to the user
    System.out.println("The retail price for model " + model + " is $" + retailPrice);
}
}