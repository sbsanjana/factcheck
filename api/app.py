from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import numpy as np
import re
from flask import jsonify
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
nltk.download('wordnet')
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer
import pandas as pd
import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection  import train_test_split
import re
import string



data = pd.read_csv('DataSet1.csv', encoding = 'latin1')
data = data.dropna(axis = 1, how = 'all')

include = ['title', 'truth ']
ndf = data[include]

ndf = ndf.dropna(axis = 0, how = 'any')
ndf.title = ndf.title.str.replace('[^a-zA-Z]', ' ')


RE_PREPROCESS = r'\W+|\d+'
ndf.title = np.array( [ re.sub(RE_PREPROCESS, ' ', title).lower() for title in ndf.title])

ndf = ndf.fillna(method='ffill')
ndf.title = ndf.title.fillna(method='ffill')

class LemmaTokenizer(object):
    def __init__(self):
        self.wnl = WordNetLemmatizer()
    def __call__(self, articles):
        return [self.wnl.lemmatize(t) for t in word_tokenize(articles)]


X = ndf.title
y = ndf['truth ']
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=2,shuffle=True)

vect=TfidfVectorizer(tokenizer=LemmaTokenizer(),stop_words='english',ngram_range=(1, 2))
vect.fit(X_train)

X_train=vect.transform(X_train)

nb = MultinomialNB(alpha=0.3)
nb.fit(X_train,y_train)




app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"
@app.route('/check', methods=['POST'])

def check():
    data = request.json['header']
    
    body = []
    data = re.sub('[^a-zA-Z]', ' ', data)
    data = data.lower()
    data = data.split()
    lemmatizer = WordNetLemmatizer()

    for word in data:
        lemmatizer.lemmatize(word)
    data = ' '.join(data)
    body.append(data)
    vecArr = vect.transform(body).toarray()
    response = nb.predict(vecArr)
    response = str(response[0])

    return jsonify(response)

app.run(port='8000', debug=True)


# app = Flask(__name__)
# @app.route('/')
# def index():
#     return "Hello, World!"

# if __name__ == '__main__':
#     app.run(debug=True)


    # @app.route('/')
    # def hello_world():
    #     return 'Hello World!'

    # if __name__ == '__main__':
    #     app.debug = True
    #     app.run()
# @app.route('/', methods=['POST','GET'])
# def main():
#     if request.method == 'POST':
#         return ("hi")
# #         # data = request.form['header']
# #         # header = re.sub('[^a-zA-Z]', ' ', header)
# #         # header = header.lower()
# # 		# header = header.split()
# #         # lemmatizer = WordNetLemmatizer()

# #         # for word in data:
# #         #     data = 
#     if __name__ == "__main__":
#         app.run(host='0.0.0.0',port='8001',debug=True)

