from datetime import datetime, timedelta
import data_manager


def register_vote(user_name, planet_id, planet_name):
    user_id = get_user_id(user_name)[0]
    submission_time = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.now())
    SQL = """INSERT INTO planet_votes(planet_id, planet_name, user_id, submission_time)
            VALUES (%s, %s, %s, %s);"""
    data = (planet_id, planet_name, user_id, submission_time)
    fetch = None
    data_manager.send_query(SQL, data, fetch)
    return True


def get_user_id(user_name):
    SQL = """SELECT id FROM accounts
            WHERE user_name = %s;"""
    data = (user_name, )
    fetch = True
    result = data_manager.send_query(SQL, data, fetch)
    if result:
        print(result)
        return result
    return None
