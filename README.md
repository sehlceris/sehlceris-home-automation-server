# sehlceris-home-automation-server

Basic NestJS server that responds to HTTP RPC from cloud services, and forwards these requests as events over a WebSocket server on the LAN.

## setup

```bash
SERVICE_NAME=sehlceris-home-automation-server
mkdir -p ~/apps
cd ~/apps
git clone https://github.com/sehlceris/$SERVICE_NAME.git
cd $SERVICE_NAME
touch config.json
chmod 600 config.json
npm i
npm run build
```

At this point, edit your config.json to your needs.

```bash
echo "
[Unit]
Description=$SERVICE_NAME

[Service]
Restart=always
ExecStart=/usr/local/bin/npm --prefix $PWD run start:prod

[Install]
WantedBy=default.target
" | sudo tee /etc/systemd/system/$SERVICE_NAME.service  > /dev/null

sudo systemctl stop $SERVICE_NAME
sudo systemctl disable $SERVICE_NAME
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl start $SERVICE_NAME
sudo systemctl status $SERVICE_NAME
```


## testing

### sleep computers using the authorization header

```bash
REMOTE_CONTROL_SERVER=localhost:3000
REMOTE_CONTROL_TOKEN=CKl3euiIUVNgaxyhYqqvXciLCfu2P3TsZjMrPDjenXRZgVcOglA9BpuI0OlGZJ4wFRy8KtqzihzRrQNeslSHTA
curl -X POST "$REMOTE_CONTROL_SERVER/remote-control/sleepComputers" -H "Authorization: Bearer $REMOTE_CONTROL_TOKEN"
```

### sleep computers using the authorization query string

This is because IFTTT doesn't allow setting headers in their requests

```bash
REMOTE_CONTROL_SERVER=localhost:3000
REMOTE_CONTROL_TOKEN=CKl3euiIUVNgaxyhYqqvXciLCfu2P3TsZjMrPDjenXRZgVcOglA9BpuI0OlGZJ4wFRy8KtqzihzRrQNeslSHTA
curl -X POST "$REMOTE_CONTROL_SERVER/remote-control/sleepComputers?authorization=$REMOTE_CONTROL_TOKEN"
```
