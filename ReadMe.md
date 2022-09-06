## [hibit-client](https://github.com/NickCarducci/hibit-client)

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

### have to remove gcloud and node_modules from git? (.gitignore)

`git push --set-upstream origin maintenance --force`

[cloud run (api gateway, load balance) service](https://cloud.google.com/api-gateway/docs/creating-api-config)

`gcloud config list project`

`gcloud config set project vaumoney`

`gcloud api-gateway api-configs create backbank --api=backbank --openapi-spec=swagger.yaml --project=vaumoney --backend-auth-service-account=vaumoney@appspot.gserviceaccount.com`

[IAM service accounts](https://cloud.google.com/api-gateway/docs/configure-dev-env#enabling_required_services) required for api gateway configs for vaumoney@appspot.gserviceaccount.com	

[swagger.yaml](https://editor.swagger.io/)

### [custom domain](https://cloud.google.com/api-gateway/docs/using-custom-domains)

(regional http) load-balancer [backend](https://medium.com/google-cloud/choosing-the-right-load-balancer-9ec909148a85) type: [Serverless Network Endpoint Group](https://cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts) - IP or fully qualifies domain name "referer + /"

instance load balancer NEG Zonal for other uses than regional backend LB (premium is pay as you go)

### or, use the provided api gateway https://backbank-_.gateway.dev/ with cloud armour

with cloud run vs. ...compute engine,virtual machine,NEG

> Cloud run (custom domain): "None of the URLs above are directly accessible because this service only allows authenticated invocations." and swagger.yaml (API gateway) uses such domain (or Assigned by Cloud Run https://backbank-_.a.run.app) as host


[endpoints](https://stackoverflow.com/questions/63389913/how-can-my-cloud-run-accept-traffic-only-from-cloud-scheduler-and-google-directo)

who would attack an authorization endpoint if they will always be rejected?

gcloud [endpoints services deploy](https://www.reddit.com/r/googlecloud/comments/exl961/does_cloud_endpoints_provide_some_sort_of_dos/) swagger.yaml --project=vaumoney && `gcloud services enable vault-co.in`

[ESP or python](https://cloud.google.com/endpoints/docs/openapi/set-up-cloud-run-espv2)