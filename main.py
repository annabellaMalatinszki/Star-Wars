from flask import Flask, url_for, render_template, redirect, request, session, flash, g
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    elif request.method == "POST":
        session.pop("user", None)
        if request.form["pwd"] == "admin":
            # a function checking the password belonging to the user in the database
            # should go here with the user_name and password as arguments
            session["user"] = request.form["user_name"]
            # logged in stuff should come here
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.pop("user", None)
    return "Logged out"


@app.before_request
def before_request():
    g.user = None
    if "user" in session:
        g.user = session["user"]
# to make something password protected, you have to envelop it in "if g.user:"


if __name__ == "__main__":
    app.run(debug=True)
