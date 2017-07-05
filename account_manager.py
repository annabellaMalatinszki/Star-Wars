from datetime import datetime, timedelta
import data_manager


def register_user(user_name, password):
    reg_date = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.now())
    SQL = """INSERT INTO accounts (user_name, password, reg_date)
            VALUES (%s, %s, %s);"""
    data = (user_name, password, reg_date)
    fetch = None
    data_manager.send_query(SQL, data, fetch)
