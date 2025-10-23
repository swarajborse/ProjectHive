from flask import Flask, render_template
app = Flask(__name__)

import controller.config
import models
import controller.api
import controller.routes as routes


print(app.url_map)


if __name__ == '__main__':
    app.run(debug=True)