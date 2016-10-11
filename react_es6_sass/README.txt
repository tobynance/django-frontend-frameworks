# To get everything installed (on Linux Mint 18), I ran:
mkdir ~/bin

# I downloaded node (nodejs.org) and installed it in my ~/bin
# directory, then added the following line to ~/.bashrc (make
# sure to update for the version of node you download):

#   export PATH=$HOME/bin:$HOME/bin/node-v4.5.0-linux-x64/bin:$PATH


sudo apt install build-essential python-setuptools python-pip python-virtualenv virtualenv python-dev

sudo pip install --upgrade pip
sudo pip install virtualenvwrapper
mkdir $/.virtualenvs

echo 'export WORKON_HOME=$HOME/.virtualenvs' >> ~/.bashrc
echo 'source /usr/local/bin/virtualenvwrapper.sh' >> ~/.bashrc

# To make it apply to THIS terminal session
export WORKON_HOME=$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh

mkvirtualenv django-frontend
pip install -r requirements.txt
cd react_es6_sass
npm install
