# sehlceris-home-automation-server

Basic NestJS server that responds to HTTP RPC from cloud services, and forwards these requests as events over a WebSocket server on the LAN.

## testing

### sleep computers using the authorization header

```bash
REMOTE_CONTROL_TOKEN=CKl3euiIUVNgaxyhYqqvXciLCfu2P3TsZjMrPDjenXRZgVcOglA9BpuI0OlGZJ4wFRy8KtqzihzRrQNeslSHTA
curl -X POST "localhost:3000/remote-control/sleepComputers" -H "Authorization: Bearer $REMOTE_CONTROL_TOKEN"
```

### sleep computers using the authorization query string

This is because IFTTT doesn't allow setting headers in their requests

```bash
REMOTE_CONTROL_TOKEN=CKl3euiIUVNgaxyhYqqvXciLCfu2P3TsZjMrPDjenXRZgVcOglA9BpuI0OlGZJ4wFRy8KtqzihzRrQNeslSHTA
curl -X POST "localhost:3000/remote-control/sleepComputers?authorization=$REMOTE_CONTROL_TOKEN"
```
