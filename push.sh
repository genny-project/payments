#!/bin/bash

if [ -z "${1}" ]; then
   version="latest"
else
   version="${1}"
fi


docker push gennyproject/payments:"${version}"
docker tag  gennyproject/payments:"${version}"  gennyproject/payments:latest
docker push gennyproject/payments:latest

