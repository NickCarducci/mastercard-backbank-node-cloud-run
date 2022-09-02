[ATM location intelligence](https://developer.mastercard.com/locations/documentation/sdk-reference/)

process.env<secrets> consumer, p12 keys

[PATH="$PATH:$HOME/gcloud"](https://cloud.google.com/run/docs/testing/local)

[Cloud Run comes with a generous free tier and is pay per use, which means you only pay while a request is being handled on your container instance. (If it is idle with no traffic, then you don’t pay anything).](https://github.com/GoogleCloudPlatform/cloud-build-samples/blob/main/multiple-node-versions-example/index.js)

[Because jobs should not serve requests, the container should not listen on a port or start a web server.](https://cloud.google.com/run/docs/container-contract#jobs-exit)

Container called exit(1). The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable.

*Plural in quote double quote?*

### EDIT: ..or ...use [secret manager](https://console.cloud.google.com/security/secret-manager) and [use them](https://cloud.google.com/build/docs/securing-builds/use-secrets)

~~[Terraform](https://github.com/google-github-actions/auth#setup) IAM Federation for cloud-build inside github actions, to use secret environment variables~~

cli `cd desktop/mastercard-backbank-node-cloud-run && export PROJECT_ID="vaumoney"` terminal env variable

Install [gcloud](https://cloud.google.com/sdk/docs/install) for your target device and add it to this project after updating node_modules with npm install, drag into this project. `cd desktop/mastercard-backbank-node-cloud-run && ./google-cloud-sdk/install.sh`

git add .
git commit -m "ok"
git push

`(Optional) Create a Google Cloud Service Account. If you already have a Service Account, take note of the email address and skip this step.` Add Principal: vaumoney@appspot.gserviceaccount.com or not the ID 580465804476@cloudbuild.gserviceaccount.com

have to remove gcloud and node_modules from git? 

`git push --set-upstream origin maintenance --force`