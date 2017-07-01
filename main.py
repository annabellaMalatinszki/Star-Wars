from flask import Flask, url_for, render_template, redirect, request


app = Flask(__name__)


@app.route("/")
def show_main_page():
    return render_template("index.html")


@app.route("/register")
def register():
    return render_template("register.html")


@app.route("/login")
def login():
    return render_template("login.html")


if __name__ == "__main__":
    app.run(debug=True)
