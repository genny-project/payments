FROM node:9.3-onbuild
EXPOSE 3456
RUN npm test
