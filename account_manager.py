from datetime import datetime, timedelta
import data_manager
import helper


def register_user(user_name, password):
    reg_date = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.now())
    SQL = """INSERT INTO accounts (user_name, password, reg_date)
            VALUES (%s, %s, %s);"""
    data = (user_name, password, reg_date)
    fetch = None
    data_manager.send_query(SQL, data, fetch)


def match_name_and_password(user_name, password):
    SQL = """SELECT password FROM accounts WHERE user_name = %s;"""
    data = (user_name,)
    fetch = True
    result = data_manager.send_query(SQL, data, fetch)
    if result:
        right_password = result[0][0]
        match = helper.test_passwords(password, right_password)
        return True
    return False
