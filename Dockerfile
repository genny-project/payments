FROM node:9.2-onbuild
EXPOSE 3456
RUN npm test
