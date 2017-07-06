import psycopg2
import os
import urllib


def send_query(SQL, data, fetch):
    urllib.parse.uses_netloc.append('postgres')
    url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
    conn = None
    try:
        conn = psycopg2.connect(
            database=url.path[1:],
            user=url.username,
            password=url.password,
            host=url.hostname,
            port=url.port
        )
    except psycopg2.OperationalError as oe:
        print("Could NOT connect to database.")
        print(oe)
    else:
        conn.autocommit = True
        with conn.cursor() as cursor:
            if data:
                cursor.execute(SQL, data)
            else:
                cursor.execute(SQL)
            if fetch:
                result = cursor.fetchall()
                if result:
                    return result
    finally:
        if conn:
            conn.close()
