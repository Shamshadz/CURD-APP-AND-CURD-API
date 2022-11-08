import requests
import json

URL = "http://127.0.0.1:8000/productapi/"
URL1= "http://127.0.0.1:8000/product/?search=ferrari"

def get_data(id = None):
    data ={}
    if id is not None:
        data = {'id':id}
    json_data = json.dumps(data)
    r = requests.get(url=URL1, data = json_data)
    data = r.json()
    print(data)

get_data()

def post_data():
    data = {
        # 'id':12,
        'name':'ferrari car',
        'price':100000000,
        'quantity':12
    }

    json_data = json.dumps(data)
    r = requests.post(url=URL, data = json_data)
    data = r.json()
    print(data)

# post_data()

def update_data():
    data = {
        'id': 53,
        # 'name':'',
        'price':60,
        # 'quantity':'',
    }

    json_data = json.dumps(data)
    r = requests.put(url=URL, data = json_data)
    data = r.json()
    print(data)

# update_data()

def delete_data():
    data = {
        'id': 6,
    }

    json_data = json.dumps(data)
    r = requests.delete(url=URL, data = json_data)
    data = r.json()
    print(data)

# delete_data()