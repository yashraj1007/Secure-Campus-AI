from database.db import get_db_connection

conn = get_db_connection()
cursor = conn.cursor()

# Student User
cursor.execute("""
INSERT OR IGNORE INTO users(name,email,password,role)
VALUES(?,?,?,?)
""", (
    "Student User",
    "student@campus.com",
    "student123",
    "student"
))

# Admin User
cursor.execute("""
INSERT OR IGNORE INTO users(name,email,password,role)
VALUES(?,?,?,?)
""", (
    "Admin User",
    "admin@campus.com",
    "admin123",
    "admin"
))

conn.commit()
conn.close()

print("✅ Demo users inserted successfully.")