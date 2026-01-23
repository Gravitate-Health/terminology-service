# Terminology Service Helm Chart

A production-ready Helm chart for deploying the Gravitate Health Terminology Service to Kubernetes.

## TL;DR

```bash
# Deploy from OCI registry
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service --version 0.1.0

# Deploy from local chart
helm install terminology-service ./
```

## Introduction

This chart deploys the Terminology Service, a REST API that provides medical terminology mappings for health problems, allergies, and intolerances using ICPC-2 and SNOMED-CT codes.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.8+
- (Optional) Istio 1.10+ if using service mesh networking

## Installing the Chart

### From OCI Registry (Recommended)

```bash
# Login to GitHub Container Registry (if private repository)
helm registry login ghcr.io -u <your-github-username>

# Install the chart
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service \
  --version 0.1.0 \
  --namespace default \
  --create-namespace
```

### From Local Source

```bash
# Clone the repository
git clone https://github.com/Gravitate-Health/terminology-service.git
cd terminology-service

# Install the chart
helm install terminology-service ./charts/terminology-service
```

### With Custom Values

```bash
# Create a custom values file
cat > my-values.yaml <<EOF
replicaCount: 3
image:
  tag: v0.10.0
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi
EOF

# Install with custom values
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service \
  --version 0.1.0 \
  -f my-values.yaml
```

## Uninstalling the Chart

```bash
helm uninstall terminology-service
```

This removes all Kubernetes resources associated with the chart and deletes the release.

## Configuration

### Networking Modes

The chart supports three networking modes via the `networking.type` parameter:

#### 1. Istio (Default)
For Kubernetes clusters with Istio service mesh:

```yaml
networking:
  type: istio
  istio:
    virtualService:
      hosts:
        - "*"
      gateways:
        - gh-gateway  # Reference to existing gateway
      http:
        - match:
            - uri:
                prefix: /terminologies/
          rewrite:
            uri: "/"
```

**Note:** When using Istio mode, ensure the referenced gateway (e.g., `gh-gateway`) exists in your cluster.

#### 2. Kubernetes Ingress
For standard Kubernetes ingress:

```yaml
networking:
  type: ingress
  ingress:
    className: nginx
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt-prod
    hosts:
      - host: terminology.example.com
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: terminology-tls
        hosts:
          - terminology.example.com
```

#### 3. None (Service Only)
For cluster-internal access only:

```yaml
networking:
  type: none
```

### Key Configuration Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of pod replicas | `1` |
| `image.repository` | Container image repository | `gravitate-registry.cr.de-fra.ionos.com/terminology-service` |
| `image.tag` | Container image tag | `v0.10.0` |
| `image.pullPolicy` | Image pull policy | `Always` |
| `service.type` | Kubernetes service type | `ClusterIP` |
| `service.port` | Service port | `3000` |
| `networking.type` | Networking mode (istio/ingress/none) | `istio` |
| `resources.limits.cpu` | CPU limit | Not set |
| `resources.limits.memory` | Memory limit | Not set |
| `resources.requests.cpu` | CPU request | Not set |
| `resources.requests.memory` | Memory request | Not set |
| `autoscaling.enabled` | Enable HorizontalPodAutoscaler | `false` |
| `autoscaling.minReplicas` | Minimum replicas for autoscaling | `1` |
| `autoscaling.maxReplicas` | Maximum replicas for autoscaling | `10` |

### Complete values.yaml Reference

See [values.yaml](values.yaml) for all available configuration options.

## Examples

### Production Deployment with Resource Limits

```yaml
# prod-values.yaml
replicaCount: 3

image:
  tag: v0.10.0
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 1000m
    memory: 1Gi
  requests:
    cpu: 500m
    memory: 512Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

livenessProbe:
  enabled: true
  path: /health
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  enabled: true
  path: /ready
  initialDelaySeconds: 10
  periodSeconds: 5

networking:
  type: istio
  istio:
    virtualService:
      hosts:
        - "terminology.production.example.com"
      gateways:
        - production-gateway
      http:
        - match:
            - uri:
                prefix: /terminologies/
          rewrite:
            uri: "/"
          timeout: 30s
          retries:
            attempts: 3
            perTryTimeout: 10s
```

Deploy:
```bash
helm install terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service \
  --version 0.1.0 \
  --namespace production \
  --create-namespace \
  -f prod-values.yaml
```

### Development Deployment with Ingress

```yaml
# dev-values.yaml
replicaCount: 1

image:
  tag: latest
  pullPolicy: Always

networking:
  type: ingress
  ingress:
    className: nginx
    annotations:
      nginx.ingress.kubernetes.io/rewrite-target: /
    hosts:
      - host: terminology-dev.example.com
        paths:
          - path: /
            pathType: Prefix
```

Deploy:
```bash
helm install terminology-service-dev ./charts/terminology-service \
  --namespace development \
  --create-namespace \
  -f dev-values.yaml
```

## Upgrading

```bash
# Upgrade to a new version
helm upgrade terminology-service oci://ghcr.io/gravitate-health/charts/terminology-service \
  --version 0.2.0 \
  -f my-values.yaml

# Rollback to previous version
helm rollback terminology-service
```

## Development

### Linting

```bash
helm lint ./charts/terminology-service
```

### Testing Template Rendering

```bash
# Render templates with default values
helm template terminology-service ./charts/terminology-service

# Render with custom values
helm template terminology-service ./charts/terminology-service -f my-values.yaml

# Debug mode
helm template terminology-service ./charts/terminology-service --debug
```

### Packaging

```bash
# Package the chart
helm package ./charts/terminology-service

# Push to OCI registry
helm push terminology-service-0.1.0.tgz oci://ghcr.io/gravitate-health/charts
```

## Troubleshooting

### Check Release Status

```bash
helm status terminology-service
helm get all terminology-service
```

### View Pod Logs

```bash
kubectl logs -l app.kubernetes.io/name=terminology-service -f
```

### Check Resources

```bash
kubectl get all -l app.kubernetes.io/name=terminology-service
kubectl describe deployment -l app.kubernetes.io/name=terminology-service
```

### Common Issues

**Issue: Pods not starting**
- Check image pull secrets: `kubectl describe pod <pod-name>`
- Verify image exists: Check the registry and tag
- Check resource limits: Ensure cluster has capacity

**Issue: Service not accessible (Istio)**
- Verify gateway exists: `kubectl get gateway`
- Check VirtualService: `kubectl get virtualservice`
- Verify Istio is installed: `kubectl get pods -n istio-system`

**Issue: Service not accessible (Ingress)**
- Verify ingress controller is running
- Check ingress resource: `kubectl get ingress`
- Verify DNS points to ingress IP

## License

Apache License, Version 2.0

## Maintainers

- Gravitate Health Team

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/Gravitate-Health/terminology-service/issues) page.
