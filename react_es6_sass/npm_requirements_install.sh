packages=(
    node-sass
    postcss-cli
    jest)

npm install -g ${packages[*]}

# based off of http://blog.revathskumar.com/2016/02/browserify-separate-app-and-vendor-bundles.html
browserify -o sample_app/static/third_party/vendor.js -r react -r react-dom -r jquery -r backbone -r flux
