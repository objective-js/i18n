<?php

$translations = [
    
    'translation.key' => 'this comes from the server-side!'
];

$keys = json_decode($_POST['keys']);
header('Content-Type: application/json');
echo json_encode(array_intersect_key($translations, array_flip($keys)));
