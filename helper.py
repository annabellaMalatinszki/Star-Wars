from werkzeug.security import check_password_hash, generate_password_hash
from string import ascii_lowercase, ascii_uppercase, digits


def hash_password(pwd1, pwd2):
    if pwd1 == pwd2:
        if len(pwd1) >= 4 and len(pwd1) <= 16:
            for character in pwd1:
                if character in (ascii_lowercase + ascii_uppercase + digits + '-_'):
                    password = generate_password_hash(pwd1, method='pbkdf2:sha512:80000', salt_length=8)
                    return password

    return None
