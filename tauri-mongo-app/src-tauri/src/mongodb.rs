use mongodb::Client;

#[tauri::command]
pub async fn connect_mongodb() -> Result<String, String> {
    let uri = "mongodb://localhost:27017";
    
    match Client::with_uri_str(uri).await {
        Ok(_client) => Ok("MongoDB connection successful!".to_string()),
        Err(e) => Err(format!("MongoDB connection failed: {}", e))
    }
}

#[tauri::command]
pub async fn list_databases() -> String {
    let uri = "mongodb://localhost:27017";
    let client = Client::with_uri_str(uri).await.unwrap();
    let databases = client.list_databases().await.unwrap();
    format!("Databases: {:?}", databases)
}
