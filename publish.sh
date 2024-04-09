export IMPERIAL_GROUP_PATH=/home/user/Documents/GitHub/DriveHopBackand

cd $IMPERIAL_GROUP_PATH
URLLIVE="ec2-user@ec2-23-20-214-128.compute-1.amazonaws.com"

zip -qq -r $IMPERIAL_GROUP_PATH/../imperialGroup-node.zip ./* .env* -x "node_modules/*"
echo "zip file $IMPERIAL_GROUP_PATH/../imperialGroup-node.zip"

scp -i $IMPERIAL_GROUP_PATH/keys/imperialGroup.pem $IMPERIAL_GROUP_PATH/../imperialGroup-node.zip $URLLIVE:./
echo "File uploaded from path $IMPERIAL_GROUP_PATH/../imperialGroup-node.zip"

ssh -i "$IMPERIAL_GROUP_PATH/keys/imperialGroup.pem" $URLLIVE 'bash -s' < ./install-on-server.sh

# ssh -i "/Users/12345678/Desktop/ars/trade-server/keys/imperialGroup.pem" ec2-user@ec2-23-20-214-128.compute-1.amazonaws.com
# ssh -i "/Users/yevagalstyan/Desktop/trade-front/keys/imperialGroup.pem" ec2-user@ec2-23-20-214-128.compute-1.amazonaws.com

rm -rf $IMPERIAL_GROUP_PATH/../imperialGroup-node.zip
echo "Temp file deleted at path $IMPERIAL_GROUP_PATH/../imperialGroup-node.zip"


