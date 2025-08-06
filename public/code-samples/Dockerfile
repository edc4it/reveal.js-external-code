# syntax = docker/dockerfile:1
FROM alpine
RUN --mount=type=secret,id=somesecret,required=true <<EOF
  echo "Performing operations with the secret:"
  echo -n "Secret: "
  cat /run/secrets/somesecret
EOF
