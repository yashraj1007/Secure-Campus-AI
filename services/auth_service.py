from database.db import get_db_connection


def login_user(email, password, role):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id, name, email, role
        FROM users
        WHERE email = ?
        AND password = ?
        AND role = ?
        """,
        (email, password, role),
    )

    user = cursor.fetchone()
    connection.close()

    if user is None:
        return None

    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user["role"]
    }