<?php

class Database {
    // Zmień te dane, jeśli w swoim XAMPP/Laragon masz inne hasło!
    private $host = "127.0.0.1";
    private $db_name = "pokemon_builder_db";
    private $username = "root";
    private $password = ""; // Domyślnie w XAMPP hasło jest puste
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            // Ustawienie PDO, żeby wyrzucało wyjątki w razie błędów
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            // W razie błędu zwracamy JSON, bo to API
            http_response_code(500);
            echo json_encode(["error" => "Błąd połączenia z bazą: " . $exception->getMessage()]);
            exit;
        }
        return $this->conn;
    }
}
?>