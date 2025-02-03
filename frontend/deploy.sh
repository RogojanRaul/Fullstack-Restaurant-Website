 docker build -t registry.simplyeverything.com/demo:latest .
 docker push registry.simplyeverything.com/demo:latest
 kubectl rollout restart deployment demo