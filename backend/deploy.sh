 docker build -t registry.simplyeverything.com/api-demo:latest .
 docker push registry.simplyeverything.com/api-demo:latest
 kubectl rollout restart deployment api-demo