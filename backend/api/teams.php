<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

include_once '../config/Database.php';
$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $query = "SELECT id, name, team_data, created_at FROM teams ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $teams = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['team_data'] = json_decode($row['team_data']);
            $teams[] = $row;
        }
        echo json_encode($teams);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $query = "DELETE FROM teams WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Usunięto drużynę."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Nie udało się usunąć."]);
            }
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["message" => "Metoda nieobsługiwana."]);
        break;
}
?>