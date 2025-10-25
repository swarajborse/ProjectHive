import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;

public class BusReservationSystem extends JFrame implements ActionListener {
    private JTextField nameField, mobileField, busNumberField, seatField, dateField;
    private JComboBox<String> routeCombo;
    private JButton reserveButton, resetButton, viewReservationsButton, deleteButton;
    private JTextArea outputArea;

    // Database Credentials
    private static final String URL = "jdbc:oracle:thin:@localhost:1521:xe";
    private static final String USER = "system";
    private static final String PASSWORD = "system";

    public BusReservationSystem() {
        setTitle("Bus Reservation System");
        setSize(500, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new GridLayout(9, 2, 5, 5));

        add(new JLabel("Name:"));
        nameField = new JTextField();
        add(nameField);

        add(new JLabel("Mobile Number:"));
        mobileField = new JTextField();
        add(mobileField);

        add(new JLabel("Bus Number:"));
        busNumberField = new JTextField();
        add(busNumberField);

        add(new JLabel("Route:"));
        String[] routes = {"City A to City B", "City B to City C", "City C to City D"};
        routeCombo = new JComboBox<>(routes);
        add(routeCombo);

        add(new JLabel("Seat Number:"));
        seatField = new JTextField();
        add(seatField);

        add(new JLabel("Travel Date (YYYY-MM-DD):"));
        dateField = new JTextField();
        add(dateField);

        // Buttons
        reserveButton = new JButton("Reserve");
        resetButton = new JButton("Reset");
        viewReservationsButton = new JButton("View Reservations");
        deleteButton = new JButton("Cancel Reservation");

        add(reserveButton);
        add(resetButton);
        add(viewReservationsButton);
        add(deleteButton);

        reserveButton.addActionListener(this);
        resetButton.addActionListener(this);
        viewReservationsButton.addActionListener(this);
        deleteButton.addActionListener(this);

        // Output Area
        outputArea = new JTextArea(5, 30);
        outputArea.setEditable(false);
        add(new JScrollPane(outputArea));

        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == reserveButton) {
            reserveSeat();
        } else if (e.getSource() == resetButton) {
            resetFields();
        } else if (e.getSource() == viewReservationsButton) {
            viewReservations();
        } else if (e.getSource() == deleteButton) {
            cancelReservation();
        }
    }

    private void reserveSeat() {
        String name = nameField.getText();
        String mobile = mobileField.getText();
        String busNumber = busNumberField.getText();
        String route = (String) routeCombo.getSelectedItem();
        String seatNumber = seatField.getText();
        String travelDate = dateField.getText();

        if (name.isEmpty() || mobile.isEmpty() || busNumber.isEmpty() || seatNumber.isEmpty() || travelDate.isEmpty()) {
            JOptionPane.showMessageDialog(this, "All fields are required!", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        int confirm = JOptionPane.showConfirmDialog(this, "Confirm Reservation?", "Confirm", JOptionPane.YES_NO_OPTION);
        if (confirm != JOptionPane.YES_OPTION) {
            return;
        }

        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = con.prepareStatement("INSERT INTO bus_reservations VALUES (bus_reservations_seq.NEXTVAL, ?, ?, ?, ?, ?, TO_DATE(?, 'YYYY-MM-DD'))")) {

            ps.setString(1, name);
            ps.setString(2, mobile);
            ps.setString(3, busNumber);
            ps.setString(4, route);
            ps.setInt(5, Integer.parseInt(seatNumber));
            ps.setString(6, travelDate);

            int rowsInserted = ps.executeUpdate();
            if (rowsInserted > 0) {
                JOptionPane.showMessageDialog(this, "Reservation Successful!", "Success", JOptionPane.INFORMATION_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this, "Reservation Failed!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(this, "Database Error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void viewReservations() {
        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM bus_reservations")) {

            outputArea.setText("ID | Name | Mobile | Bus | Route | Seat | Date\n");
            outputArea.append("----------------------------------------------------\n");

            while (rs.next()) {
                outputArea.append(rs.getInt("id") + " | " +
                                  rs.getString("name") + " | " +
                                  rs.getString("mobile") + " | " +
                                  rs.getString("bus_number") + " | " +
                                  rs.getString("route") + " | " +
                                  rs.getInt("seat_number") + " | " +
                                  rs.getDate("travel_date") + "\n");
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(this, "Database Error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void cancelReservation() {
        String mobile = JOptionPane.showInputDialog(this, "Enter Mobile Number to Cancel Reservation:");
        if (mobile == null || mobile.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter a valid mobile number!", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement ps = con.prepareStatement("DELETE FROM bus_reservations WHERE mobile = ?")) {

            ps.setString(1, mobile);
            int rowsDeleted = ps.executeUpdate();

            if (rowsDeleted > 0) {
                JOptionPane.showMessageDialog(this, "Reservation Cancelled!", "Success", JOptionPane.INFORMATION_MESSAGE);
            } else {
                JOptionPane.showMessageDialog(this, "No Reservation Found!", "Error", JOptionPane.ERROR_MESSAGE);
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(this, "Database Error: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void resetFields() {
        nameField.setText("");
        mobileField.setText("");
        busNumberField.setText("");
        seatField.setText("");
        dateField.setText("");
        routeCombo.setSelectedIndex(0);
    }

    public static void main(String[] args) {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            new BusReservationSystem();
        } catch (ClassNotFoundException e) {
            JOptionPane.showMessageDialog(null, "Oracle JDBC Driver not found!", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }
}
