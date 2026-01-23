Medicament Search API
=================================================

Table of contents
-----------------
- [Terminologies API](#terminologies)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
    - [Requirements](#requirements)
    - [Local deployment](#local-deployment)
    - [Kubernetes deployment](#kubernetes-deployment)
  - [Usage](#usage)
  - [Known issues and limitations](#known-issues-and-limitations)
  - [Getting help](#getting-help)
  - [Contributing](#contributing)
  - [License](#license)
  - [Authors and history](#authors-and-history)

Introduction
------------
Terminologies API that serves the mapping.

Installation
------------
### Requirements
To deploy it docker must be installed.

### Local deployment
For deploying it localy first you must build the docker image

```bash
docker build . -t terminologies
```
Once this is done, for runing the API on port 3000 run:

```bash
docker run -p 3000:3000 --name terminologies terminologies
```
This command will respond with the port that its being used to run. In this example [http://localhost:3000](http://localhost:3000)


### Kubernetes Deployment

The terminology service can be deployed to Kubernetes using either Helm (recommended) or raw Kubernetes manifests.

#### Deploy via Helm (OCI) - Recommended

The service is packaged as a Helm chart and can be deployed directly from the OCI registry without cloning the repository:

```bash
# Login to GitHub Container Registry (if private)
helm registry login ghcr.io -u <your-github-username>

# Deploy directly from the OCI registry
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service --version 0.1.0

# Or with custom values
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service \
  --version 0.1.0 \
  --set image.tag=v0.10.0 \
  --set replicaCount=2
```

**Using a custom values file:**
```bash
# Create a values override file
cat > custom-values.yaml <<EOF
replicaCount: 2
image:
  tag: v0.10.0
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi
networking:
  type: istio  # or "ingress" or "none"
EOF

# Deploy with custom values
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service \
  --version 0.1.0 \
  -f custom-values.yaml
```

**Helm chart configuration:**

The chart supports multiple networking modes via the `networking.type` value:
- `istio` (default): Uses Istio VirtualService/Gateway for service mesh environments
- `ingress`: Uses standard Kubernetes Ingress
- `none`: Service only (no external routing)

Key configuration options in `values.yaml`:
- `image.repository` / `image.tag`: Container image details
- `replicaCount`: Number of pod replicas
- `resources`: CPU/memory requests and limits
- `networking.type`: Networking strategy (istio/ingress/none)
- `networking.istio.virtualService`: Istio routing configuration
- `networking.ingress`: Standard ingress configuration

#### Local Helm Development

For local development and testing of the Helm chart:

```bash
# Lint the chart for issues
helm lint charts/terminology-service

# Test template rendering without installing
helm template terminology-service charts/terminology-service

# Install from local chart
helm install terminology-service charts/terminology-service

# Upgrade existing release
helm upgrade terminology-service charts/terminology-service

# Dry-run to see what would be deployed
helm install terminology-service charts/terminology-service --dry-run --debug
```

#### Deploy with Raw Kubernetes Manifests (Legacy)

For deploying the terminology module on kubernetes using raw manifests, first apply the [001_terminology-deployment.yaml](kubernetes/base/001_terminology-deployment.yaml):

```bash
kubectl apply -f ./kubernetes/base/001_terminology-deployment.yaml
```
Once the deployment is running, apply the service [002_terminology-svc.yaml](kubernetes/base/002_terminology-svc.yaml):

```bash
kubectl apply -f ./kubernetes/base/002_terminology-svc.yaml
```
Finally apply the virtual service [003_terminology-vs.yaml](kubernetes/base/003_terminology-vs.yaml):

```bash
kubectl apply -f ./kubernetes/base/003_terminology-vs.yaml
```

Enviroment variables

| Environment Variable | Description                                   | Default                         |
|----------------------|-----------------------------------------------|---------------------------------|
| PORT                 | Default port for running the API              | 3000                            |


Usage
-----


FOSPS swagger with all the routes avaible [here](https://fosps.gravitatehealth.eu/swagger-fosps/?urls.primaryName=Terminology%20Service)


There is 3 endpoint avaible on [GET] \<base-url>/

| Endpoint       | Description                                   |
|----------------|-----------------------------------------------|
| /problem-list  | Endpoint to retrieve health problems          |
| /allergies     | Endpoint to retrieve food allergies           | 
| /intollerances | Endpoint to retrieve  intolerances            | 

For each endpoint there is the /all function that gets every condition with the following strucuture


- /problem-list/all
```JSON

    {
        "Health problem": "HIV-infection/AIDS",
        "ICPC-2": "B90 HIV-infection/AIDS",
        "URL": "https://www.rxreasoner.com/icpc2codes/B90"
    }


```
- /allergies 
```JSON

    {
        "Allergy": "Allergy to tree nut",
        "SNOMED-SCITD": "48821000119104"
    }


```
- /intollerances 
```JSON

    {
        "Intollerance": "Intolerance to lactose",
        "SNOMED-SCITD": "782415009"
    }


```

Known issues and limitations
----------------------------

List will grow over time, right now is just a short list


Getting help
------------
In case you find a problem or you need extra help, please use the issues tab to report the issue.

Contributing
------------
To contribute, fork this repository and send a pull request with the changes squashed.

License
------------

This project is distributed under the terms of the [Apache License, Version 2.0 (AL2)](https://www.apache.org/licenses/LICENSE-2.0). The license applies to this file and other files in the [GitHub repository](https://github.com/Gravitate-Health/keycloak) hosting this file.
```
Copyright 2022 Universidad Politécnica de Madrid

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

Authors and history
---------------------------
- Alejo Esteban ([@10alejospain](https://github.com/10alejospain))
