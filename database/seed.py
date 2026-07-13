from database.db import get_db_connection

connection = get_db_connection()
cursor = connection.cursor()

# Check if student already exists
cursor.execute("SELECT * FROM users WHERE email = ?", ("student@campus.com",))
student = cursor.fetchone()

if not student:
    cursor.execute("""
        INSERT INTO users(name, email, password, role)
        VALUES (?, ?, ?, ?)
    """, (
        "Student User",
        "student@campus.com",
        "student123",
        "student"
    ))

# Check if admin already exists
cursor.execute("SELECT * FROM users WHERE email = ?", ("admin@campus.com",))
admin = cursor.fetchone()

if not admin:
    cursor.execute("""
        INSERT INTO users(name, email, password, role)
        VALUES (?, ?, ?, ?)
    """, (
        "Admin User",
        "admin@campus.com",
        "admin123",
        "admin"
    ))

connection.commit()
connection.close()

print("✅ Demo users inserted successfully.")