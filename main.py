from flask import Flask, url_for, render_template, redirect, request, session, flash, g
import os

import data_manager
import account_manager
import helper

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        user_name = request.form["reg_user_name"]
        user_name_valid = helper.valid_user_name(user_name)
        pwd1 = request.form["reg_pwd1"]
        pwd2 = request.form["reg_pwd2"]
        password = helper.hash_password(pwd1, pwd2)
        if password and user_name_valid:
            account_manager.register_user(user_name, password)

            flash("Successfully registered as {}.".format(user_name))
            return redirect(url_for("index"))
        else:
            flash("Failed to register")

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")

#     if request.method == "POST":
#         session.pop("user", None)
#         if request.form["pwd"] == "admin":
#             # a function checking the password belonging to the user in the database
#             # should go here with the user_name and password as arguments
#             session["user"] = request.form["user_name"]
#             # logged in stuff should come here
#     return render_template("login.html")
#
#
# @app.route("/logout")
# def logout():
#     session.pop("user", None)
#     return "Logged out"
#
#
# @app.before_request
# def before_request():
#     g.user = None
#     if "user" in session:
#         g.user = session["user"]
# # to make something password protected, you have to envelop it in "if g.user:"


if __name__ == "__main__":
    app.run(debug=True)
