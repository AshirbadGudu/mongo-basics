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
pub async fn list_databases() -> String {
    dotenv().ok();
    let uri = env::var("MONGODB_URI").unwrap_or_else(|_| "mongodb://localhost:27017".to_string());
    let client = Client::with_uri_str(uri).await.unwrap();
    let databases = client.list_databases().await.unwrap();
    format!("Databases: {:?}", databases)
}
