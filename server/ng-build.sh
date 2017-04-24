#!/bin/bash
d=$(dirname "$0")

cd $d

set -e
sudo npm install
node --max_old_space_size=700 /home/ec2-user/azzaip/node_modules/.bin/ng build --prod --verbose --output-path /home/ec2-user/azzaip/dist/ 2> /home/ec2-user/azzaip/log/ngbuild.log

sudo rm -r /dist/
sudo mv /home/ec2-user/azzaip/dist/ /dist
