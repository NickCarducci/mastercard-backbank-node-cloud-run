[<img align="right" src="https://www.dl.dropboxusercontent.com/s/58d5s6hz532y0er/Cloud%20Run%20vs.%20Cloud%20Function.png?dl=0" alt="Cloud Run vs. Cloud Functions">](https://www.youtube.com/watch?v=zRjOSxTpC3A?t=570) 
"cloud splitting, custom domains listen to port and setting up a server service"

[Cloud Run on GKE](https://www.youtube.com/watch?v=nhwYc4StHIc), maybe

# [AHHHHH](https://www.youtube.com/watch?v=5r21CVd6nwo) - (1-3. internal token generation (verification) and workflows vs. 4. require authentication external hard private key)

## [hibit-client](https://github.com/NickCarducci/hibit-client) firebase services via cloud run gateway and endpoints (swagger.yaml). well [s.o.b.](https://www.youtube.com/watch?v=yDexJC_emEw)

### [(Workflow-)](https://github.com/GoogleCloudPlatform/workflows-samples/) Invoke [Cloud Run](https://cloud.google.com/workflows/docs/samples/workflows-connect-run) for [OICD](https://cloud.google.com/workflows/docs/calling-run-functions)

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

>deploy, enable, build, deploy service *title* mastercard-backbank, *name* and *project ID*, the *host*, **in fact**, (all do so under) vault-co.in

gcloud [endpoints services deploy](https://www.reddit.com/r/googlecloud/comments/exl961/does_cloud_endpoints_provide_some_sort_of_dos/) swagger.yaml --project=vaumoney && `gcloud services enable vault-co.in`

[ESP or python](https://cloud.google.com/endpoints/docs/openapi/set-up-cloud-run-espv2)

### Alternatively use cli, instead of cloud build-api gateway

#### [Building a new ESPv2 image](https://cloud.google.com/endpoints/docs/openapi/set-up-cloud-run-espv2#configure_esp)

DEPLOYMENT HISTORY 2022-09-06r0 CONFIG_ID

`chmod +x gcloud_build_image && ./gcloud_build_image -s vault-co.in -c 2022-09-06r0 -p vaumoney`

#### Deploying the ESPv2 container

*live between their own means*, their needs; that means, welfare for the disabled, by developmental-ability, or injury

individual [retirement](https://www.quora.com/unanswered/Is-anti-production-not-dead-weight-as-capital-return-is-the-profiteer-s-natural-wage) is for naught when "commerce-expiry", not an event ever sensible

the taged url host, path, ex-protocol 5x: "gcr.io/project_id/endpoints-runtime-serverless:`<version>`-`<host>`-`<config_id>`"

`gcloud run deploy mastercard-backbank --image="gcr.io/vaumoney/endpoints-runtime-serverless:2.38.0-vault-co.in-2022-09-06r0" --set-env-vars=ESPv2_ARGS=--cors_preset=basic --allow-unauthenticated --platform managed --project vaumoney`

>If you want ESPv2 to manage access, use the --allow-unauthenticated flag to ensure that ESPv2 verifies the JWT token. If the flag is not used, the JWT token is intercepted and verified by Cloud Run access control IAM server. Since the IAM and ESPv2 use the same Authorization header, they don't work together, make sure only use one of them. Recommend to use IAM instead of ESPv2 for managing access.

[look](https://cloud.google.com/run/docs/triggering/using-workflows#gcloud) at [me](https://github.com/GoogleCloudPlatform/workflows-samples/blob/main/src/connect_run.workflows.yaml), I'm [donkey](https://cloud.google.com/endpoints/docs/openapi/openapi-extensions)

`gcloud beta workflows deploy this_workflow --source src/this_workflow.workflows.yaml`

"will the special master have the security clearance?" is the government fdic insured? is there oversight, transparency, accountability to use/time value-power as the return/capital of profiteer/labor while the contractor/durable-good lives.

`this_workflow`
````
- call_my_function:
    call: http.get
    args:
      url: https://example-12345-ew.a.run.app
      auth:
        type: OIDC
      query:
        some_val: "Hello World"
        another_val: 123
    result: the_message
- return_value:
    return: ${the_message.body}
````

Is sexual relations akin to hr foreign but for racketeering incrimination by testimony under threat agent registry storage less expiry use for exchange as input towards the natural individual. Does a natural wage not account for profits, wages and costs to revenue?

tech owned by labor. computer labs in homeless shelters. Isn’t socialism defined by welfare for the injured and developmentally disabled alone? Isn’t it unfortunate that because of finance we increasingly need to force elderly people to work harder and faster? Does a real wage not ignore profits and costs to revenue that so avails itself in the natural wage? Does a natural wage not account for profits, wages, and costs to revenue? (*Isn’t production capital-return by profiteer’s, labor’s, and durable good wage?*) Is anti-production not “dead-weight” as “capital-return” is the profiteer’s natural wage?

naturally, you've [banned - "stange adverbs" cornpop] yourself within use exchange

"In New Jersey, is self-serve gas free?" Are free as individual use of the rigging, shipping, and storing gets, bane.

Bannon: sinister "they will have to kill me"
#### compulsion by belief of legal applicability
Is a business or policy idea not able to be withheld (without compulsion otherwise) from the people of the world if certain laws are believed to have been broken by the delinquent provisional copyright owner?

Disabilities · 
Following
Answered by 
Nick Carducci
 
6h
Why can't my mom understand that I am mentally ill?
I’m trying to convince my mom that I am not, but they gave her my disability ignoring my injury. They even gave an x-ray on the lacerated muscle from a sports injury (running near a highway guard rail next to a running trail entrance), yet call me bipolar schizophrenic Rollover Insurance because I only ever was a bartender for I cannot take credit as income, which is fraud of a third party. They gladly gave her the award for she has a lot of debt. I cannot even obtain it to move out with.

man this guy Grant really likes animals - watch on slow for an extra genm effect (generus gem commodity ex:change-effect)

# I.AM.COG.S profit capital power uses no labor time that takes in labor value

shouldn't we be raiding the capital over this [nice portrait](https://www.youtube.com/watch?v=4HAbnin3nto?t=110)?!

Why have inventory/checking when you can have debit depositary light no tax gold prem
Natural use to exhaange is normalized yet

education and
medicine are "essential" in tax
accounting terms and when
institutional such is a gift for the value
is rather damaged by 'expiry' and so
non-compete overtime quality
amelioration …rights of the consumer
protection exclusion. We need
memoized taxes with spoofable
docket tax. Commodity tax but non-
perishable = truncated wholesale
durable goods tax.... That is regressive
by role and transaction size, surely

What is capital revenue ?
Nick Carducci
Chairperson at Saver Party (2020–present)
Capital surely is the way revenue materializes in an operational rate of profits and cost to revenue by time, labor-notwithstanding in production of durable goods.