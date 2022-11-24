from flask import Flask

app = Flask(__name__)

# !!! VS Code will say this import is unused ITS NOT
# !!! This import also MUST be placed below the app = Flask(...) line or else it wont work
import Web.views
