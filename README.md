# MongoDB Basics

This repository contains MongoDB basics and examples for learning and reference.

## Installation

### macOS Installation Steps

#### Step 1: Add MongoDB repository

```sh
brew tap mongodb/brew
```

#### Step 2: Install MongoDB Community Edition

```sh
brew install mongodb-community
```

#### Step 3: Start MongoDB service

```sh
brew services start mongodb/brew/mongodb-community
```

#### Step 4: Connect to MongoDB shell

```sh
mongosh
```

### Alternative Installation Methods

#### Using Official Installer

1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Follow the installation wizard
3. Download MongoDB Shell separately from the same page

## Starting MongoDB Service

### macOS (using Homebrew)

#### Start MongoDB service

```sh
brew services start mongodb/brew/mongodb-community
```

#### Stop MongoDB service

```sh
brew services stop mongodb/brew/mongodb-community
```

#### Restart MongoDB service

```sh
brew services restart mongodb/brew/mongodb-community
```

#### Check service status

```sh
brew services list | grep mongodb
```

## MongoDB Shell (mongosh) Basic Commands

### Connection

```bash
# Connect to local MongoDB instance
mongosh

# Connect to specific host and port
mongosh --host localhost --port 27017

# Connect to specific database
mongosh myDatabase
```

### Database Operations

```javascript
// Show current database
db

// Show all databases
show dbs

// Switch to a database (creates if doesn't exist)
use myDatabase

// Show current database stats
db.stats()

// Drop current database
db.dropDatabase()
```

### Collection Operations

```javascript
// Show collections in current database
show collections

// Create a collection
db.createCollection("myCollection")

// Drop a collection
db.myCollection.drop()

// Show collection stats
db.myCollection.stats()
```

### Document Operations (CRUD)

#### Create (Insert)

```javascript
// Switch to schooldb database
use schooldb

// Insert one student
db.students.insertOne({
  name: "Rajesh Kumar",
  class: "12th",
  city: "Mumbai"
});

// Insert multiple students
db.students.insertMany([
  { name: "Priya Sharma", class: "11th", city: "Delhi" },
  { name: "Arjun Singh", class: "10th", city: "Bangalore" }
]);
```

#### Read (Find)

```javascript
// Find all students
db.students.find();

// Find one student
db.students.findOne({ name: "Rajesh Kumar" });

// Find students from specific class
db.students.find({ class: "12th" });

// Find with projection
db.students.find({}, { name: 1, class: 1, _id: 0 });

// Count students
db.students.countDocuments({ class: "12th" });
```

#### Update

```javascript
// Update one student
db.students.updateOne({ name: "Rajesh Kumar" }, { $set: { class: "12th" } });

// Update multiple students
db.students.updateMany({ class: "10th" }, { $set: { class: "11th" } });

// Upsert (insert if doesn't exist)
db.students.updateOne(
  { name: "Sneha Patel" },
  { $set: { name: "Sneha Patel", class: "9th", city: "Ahmedabad" } },
  { upsert: true }
);
```

#### Delete

```javascript
// Delete one student
db.students.deleteOne({ name: "Rajesh Kumar" });

// Delete multiple students
db.students.deleteMany({ class: "12th" });

// Delete all students
db.students.deleteMany({});
```

## Useful Commands

```javascript
// Show all databases
show dbs

// Show current database
db

// Show collections
show collections

// Exit mongosh
exit
```
