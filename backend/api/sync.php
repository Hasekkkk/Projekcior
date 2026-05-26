<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/Database.php';
$database = new Database();
$db = $database->getConnection();

// 3. Odbiór danych w formacie JSON
$data = json_decode(file_get_contents("php://input"));

// Upewniamy się, że to POST i że przyszła tablica
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Dozwolony tylko rygor POST."]);
    exit();
}

if (!is_array($data) || empty($data)) {
    http_response_code(400);
    echo json_encode(["message" => "Brak danych do synchronizacji."]);
    exit();
}

$syncedCount = 0;

foreach ($data as $team) {
    if (!empty($team->id) && !empty($team->name)) {
        
        $query = "INSERT INTO teams (id, name, team_data) 
                  VALUES (:id, :name, :team_data) 
                  ON DUPLICATE KEY UPDATE name = :name, team_data = :team_data";
        
        $stmt = $db->prepare($query);
        
        $teamDataJson = json_encode($team->data);

        $stmt->bindParam(":id", $team->id);
        $stmt->bindParam(":name", $team->name);
        $stmt->bindParam(":team_data", $teamDataJson);

        if ($stmt->execute()) {
            $syncedCount++;
        }
    }
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Pomyślnie zsynchronizowano drużyny.",
    "synced_count" => $syncedCount
]);
?>