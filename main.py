from flask import Flask, url_for, render_template, redirect, request, session, flash, g, jsonify

import data_manager
import account_manager
import vote_manager
import helper


app = Flask(__name__)
app.secret_key = "very_secret_key"


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
            flash("Logged in as {}.".format(user_name))
            session["user"] = user_name
            return redirect(url_for("index"))
        else:
            flash("Registration failed")

    if g.user:
        flash("Please log out first")
        return redirect(url_for("index"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user_name = request.form["login_user_name"]
        password = request.form["login_pwd"]
        match = account_manager.match_name_and_password(user_name, password)
        if match:
            session["user"] = user_name
            flash("Successfully logged in as {}.".format(user_name))
            # don't forget to add user_name to the navbar
            return redirect(url_for("index"))

        else:
            flash("Logging in failed")

    if g.user:
        flash("Please log out first")
        return redirect(url_for("index"))
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


@app.route("/logout")
def logout():
    if g.user:
        session.pop("user", None)
        flash("Logged out.")
        return redirect(url_for("index"))
    flash("You were not logged in anyway.")
    return redirect(url_for("index"))


@app.before_request
def before_request():
    g.user = None
    if "user" in session:
        g.user = session["user"]


@app.route("/api/vote", methods=["POST"])
def vote(planet_id, planet_name):
    if g.user:
        user = session["user"]
        voted = vote_manager.register_vote(user, planet_id, planet_name)
        if voted:
            flash("Voted on {}."format(planet_name))
            return jsonify("success")
