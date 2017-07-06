import data_manager


def request_stats():
    SQL = """SELECT planet_name, COUNT(planet_name) AS votes FROM planet_votes GROUP BY planet_name;"""
    data = None
    fetch = None
    planet_stats = data_manager.send_query(SQL, data, fetch)
    return planet_stats
