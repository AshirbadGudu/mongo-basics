use mongodb::Client;
// Use environment variables
use dotenv::dotenv;
use std::env;

#[tauri::command]
pub async fn connect_mongodb() -> Result<String, String> {
    dotenv().ok();
    
    let uri = env::var("MONGODB_URI");
    if uri.is_err() {
        return Err(format!("MONGODB_URI is not set"));
    }
    let uri = uri.unwrap();
    
    match Client::with_uri_str(uri).await {
        Ok(_client) => Ok("MongoDB connection successful!".to_string()),
        Err(e) => Err(format!("MongoDB connection failed: {}", e))
    }
}

#[tauri::command]
pub async fn list_databases() -> Result<serde_json::Value, String> {
    dotenv().ok();
    let uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());
    match Client::with_uri_str(uri).await {
        Ok(client) => {
            match client.list_databases().await {
                Ok(databases) => Ok(serde_json::to_value(databases).unwrap()),
                Err(e) => Err(format!("Failed to list databases: {}", e))
            }
        }, 
        Err(e) => Err(format!("MongoDB connection failed: {}", e))
    }
}
