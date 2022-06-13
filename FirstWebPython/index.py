from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/languages')
def showLanguages():
    myLanguages=("PHP", "Python", "Java", "C#"
                  "Javascript", "Perl", "Ruby", "Rust")
    return render_template('languages.html', listLanguages = myLanguages)

@app.route('/contact')
def showContact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True, port=5017)