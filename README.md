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


### Kubernetes deployment

For deploying the terminology module on kubernetes first apply the [001_terminology-deployment.yaml](https://github.com/Gravitate-Health/terminology/blob/main/YAMLs/001_terminology-deployment.yaml)

```bash
kubectl apply -f ./YAML/001_terminology-deployment.yaml
```
Once the deployment is running, apply the service [002_terminology-svc.yaml](https://github.com/Gravitate-Health/terminology/blob/main/YAMLs/002_terminology-svc.yaml)

```bash
kubectl apply -f ./YAML/002_terminology-svc.yaml
```
Finally apply the virtual service [003_terminology-vs.yaml](https://github.com/Gravitate-Health/terminology/blob/main/YAMLs/003_terminology-vs.yaml)

```bash
kubectl apply -f ./YAML/003_terminology-vs.yaml
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
