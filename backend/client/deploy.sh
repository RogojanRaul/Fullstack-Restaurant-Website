 docker build -t registry.simplyeverything.com/admin:latest .
 docker push registry.simplyeverything.com/admin:latest
 kubectl rollout restart deployment admin