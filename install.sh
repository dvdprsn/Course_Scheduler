#!/bin/bash

# install dependencies
apt-get -y install nginx python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools
apt-get -y install python3-venv

# working folder for venv
mkdir /home/py-venv
cd /home/py-venv

# new venv
python3 -m venv theproject
source theproject/bin/activate

# install in venv only (doesn't effect anything else)
pip install uwsgi flask
