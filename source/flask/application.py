from flask import Flask;
from flaskr import create_app;
from flaskr.config import DevelopmentConfig;

application = create_app(DevelopmentConfig);

if __name__ == "__main__":
    application.run()